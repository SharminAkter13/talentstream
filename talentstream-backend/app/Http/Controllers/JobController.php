<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Category;
use App\Models\JobLocation;
use App\Models\JobType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * @mixin \Illuminate\Routing\Controller
 */
class JobController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // Protect all routes with sanctum authentication
        $this->middleware('auth:sanctum');

        // Middleware to enforce roles (Employer and Admin can manage jobs)
        $this->middleware('role:employer,admin')->except(['index', 'show']);
    }

    /* ============================
        LIST ALL JOBS (index page)
        Filters jobs based on user role: Admin sees all, Employer sees only theirs.
        Candidates/others should ideally use the BrowseJobController for public listings.
    ============================ */
    public function index()
    {
        $user = Auth::user();

        $jobsQuery = Job::with(['category', 'jobLocation', 'jobType', 'employer'])
                        ->orderBy('created_at', 'desc');

        // Only show jobs relevant to the user role
        if ($user->role !== 'admin') {
            $employerId = $user->employer->id ?? null;

            if ($employerId) {
                // If user is an employer, only show their jobs
                $jobsQuery->where('employer_id', $employerId);
            } else {
                // If user is neither admin nor a registered employer, deny access or show nothing
                return response()->json(['message' => 'Unauthorized or no employer profile linked.'], 403);
            }
        }

        $jobs = $jobsQuery->paginate(15);

        return response()->json([
            'jobs' => $jobs,
            'message' => 'Jobs retrieved successfully.'
        ]);
    }

    /* ============================
        SHOW SINGLE JOB
        Returns details of a single job, along with related and featured jobs.
    ============================ */
    public function show($id)
    {
        // Use findOrFail and load all necessary relations
        $job = Job::with(['category', 'jobLocation', 'jobType', 'employer'])->findOrFail($id);

        // Fetch related jobs (same category, different ID)
        $relatedJobs = Job::with(['category', 'jobLocation'])
            ->where('category_id', $job->category_id)
            ->where('id', '!=', $job->id)
            ->limit(5)
            ->get();

        // Fetch featured jobs (active status, latest 3)
        $featuredJobs = Job::with(['category', 'jobLocation'])
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        // Fetch gallery jobs (random 6)
        $galleryJobs = Job::with(['category', 'jobLocation'])
            ->inRandomOrder()
            ->limit(6)
            ->get();

        return response()->json([
            'job' => $job,
            'relatedJobs' => $relatedJobs,
            'featuredJobs' => $featuredJobs,
            'galleryJobs' => $galleryJobs,
            'message' => 'Job details retrieved successfully.'
        ]);
    }

    /* ============================
        CREATE JOB FORM DATA
        Returns the lists of categories, locations, and types needed for the form.
    ============================ */
    public function create()
    {
        $user = Auth::user();
        $employer = $user->employer ?? null;

        if (!$employer) {
            return response()->json(['message' => 'You must have an employer profile to post a job.'], 403);
        }

        $company = $employer->company ?? null;

        return response()->json([
            'categories' => Category::all(),
            'locations' => JobLocation::all(),
            'types' => JobType::all(),
            'company' => $company, // Company details pre-fill
            'message' => 'Job creation form data retrieved.'
        ]);
    }

    /* ============================
        STORE NEW JOB
    ============================ */
    public function store(Request $request)
    {
        $user = Auth::user();
        $employer = $user->employer;

        // 1. Authorization check
        if (!$employer) {
            return response()->json(['message' => 'You must have an employer profile before posting a job.'], 403);
        }

        // 2. Validation
        $data = $request->validate([
            'title'             => 'required|string|max:255',
            'category_id'       => 'required|integer|exists:categories,id',
            'job_location_id'   => 'required|integer|exists:job_locations,id',
            'job_type_id'       => 'required|integer|exists:job_types,id',
            'description'       => 'required|string',
            'application_email' => 'nullable|email|max:255',
            'application_url'   => 'nullable|url|max:255',
            'closing_date'      => 'nullable|date',
            'tagline'           => 'nullable|string|max:255',
            'tags'              => 'nullable|string',
            'status'            => 'nullable|string|in:active,inactive,closed',
            'cover_image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $company = $employer->company ?? null;

        // Handle cover image upload
        $cover_image = null;
        if ($request->hasFile('cover_image')) {
            // Note: In an API context, usually files are handled via S3 or similar.
            // Keeping local file move logic for consistency with original file structure.
            $file = $request->file('cover_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/jobs'), $filename);
            $cover_image = 'uploads/jobs/' . $filename;
        }

        $job = Job::create([
            'user_email'        => $user->email,
            'employer_id'       => $employer->id,
            'company_id'        => $company->id ?? null,
            'company_name'      => $company->name ?? $request->company_name, // Fallback to request input if no linked company
            'website'           => $company->website ?? $request->website,   // Fallback to request input if no linked company
            'title'             => $data['title'],
            'category_id'       => $data['category_id'],
            'job_location_id'   => $data['job_location_id'],
            'job_type_id'       => $data['job_type_id'],
            'tags'              => $data['tags'] ?? null,
            'description'       => $data['description'],
            'application_email' => $data['application_email'] ?? null,
            'application_url'   => $data['application_url'] ?? null,
            'closing_date'      => $data['closing_date'] ?? null,
            'tagline'           => $data['tagline'] ?? null,
            'cover_image'       => $cover_image,
            'status'            => $data['status'] ?? 'active',
        ]);

        return response()->json([
            'message' => 'Job added successfully.',
            'job' => $job
        ], 201); // 201 Created
    }

    /* ============================
        EDIT JOB FORM DATA
        Returns the job data and lookup lists for the edit form.
    ============================ */
    public function edit($id)
    {
        $job = Job::with(['employer', 'company'])->findOrFail($id);
        $user = Auth::user();

        // Authorization check (using Policy or manual check)
        if ($user->role !== 'admin' && $job->employer_id !== ($user->employer->id ?? null)) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        $company = $user->employer->company ?? null; // The company associated with the *editing user*

        return response()->json([
            'job' => $job,
            'categories' => Category::all(),
            'locations' => JobLocation::all(),
            'types' => JobType::all(),
            'company' => $company,
            'message' => 'Job data for editing retrieved.'
        ]);
    }

    /* ============================
        UPDATE JOB
    ============================ */
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);
        $user = Auth::user();

        // Authorization check: Ensure user can edit this job
        if ($user->role !== 'admin' && $job->employer_id !== ($user->employer->id ?? null)) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        // 1. Validation
        $data = $request->validate([
            'title'             => 'required|string|max:255',
            'category_id'       => 'required|integer|exists:categories,id',
            'job_location_id'   => 'required|integer|exists:job_locations,id',
            'job_type_id'       => 'required|integer|exists:job_types,id',
            'description'       => 'required|string',
            'application_email' => 'nullable|email|max:255',
            'application_url'   => 'nullable|url|max:255',
            'closing_date'      => 'nullable|date',
            'tagline'           => 'nullable|string|max:255',
            'tags'              => 'nullable|string',
            'status'            => 'nullable|string|in:active,inactive,closed',
            'cover_image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $employer = $user->employer ?? null;
        $company = $employer->company ?? null;

        // Handle cover image upload (and removal of old image, if applicable)
        $cover_image = $job->cover_image; // Start by keeping existing image
        if ($request->hasFile('cover_image')) {
            // New file uploaded: handle new file and possibly delete old one
            // NOTE: Deleting old file is omitted here for simplicity, but recommended in production.
            $file = $request->file('cover_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/jobs'), $filename);
            $cover_image = 'uploads/jobs/' . $filename;
        }

        $job->update([
            'title'             => $data['title'],
            'category_id'       => $data['category_id'],
            'job_location_id'   => $data['job_location_id'],
            'job_type_id'       => $data['job_type_id'],
            'tags'              => $data['tags'] ?? $job->tags,
            'description'       => $data['description'],
            'application_email' => $data['application_email'] ?? $job->application_email,
            'application_url'   => $data['application_url'] ?? $job->application_url,
            'closing_date'      => $data['closing_date'] ?? $job->closing_date,
            'tagline'           => $data['tagline'] ?? $job->tagline,
            'cover_image'       => $cover_image,
            'status'            => $data['status'] ?? $job->status,
            'company_name'      => $company->name ?? $request->company_name ?? $job->company_name,
            'website'           => $company->website ?? $request->website ?? $job->website,
        ]);

        return response()->json([
            'message' => 'Job updated successfully.',
            'job' => $job
        ]);
    }

    /* ============================
        DELETE JOB
    ============================ */
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $user = Auth::user();

        // Authorization check: Ensure user can delete this job
        if ($user->role !== 'admin' && $job->employer_id !== ($user->employer->id ?? null)) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        // NOTE: Also delete associated cover image file here in a production environment

        $job->delete();
        
        return response()->json(['message' => 'Job deleted successfully.']);
    }
}