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
use Illuminate\Support\Facades\Storage; 

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

        $this->middleware('role:employer,admin')->except(['index', 'show']);
    }

    /* ============================
        LIST ALL JOBS (index page)
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
                $jobsQuery->where('employer_id', $employerId);
            } else {
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
            'company' => $company, 
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

        // Handle cover image upload using Storage facade
        $cover_image = null;
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('uploads/jobs', 'public');
            $cover_image = $path;
        }

        $job = Job::create([
            'user_email'        => $user->email,
            'employer_id'       => $employer->id,
            'company_id'        => $company->id ?? null,
            'company_name'      => $company->name ?? $request->company_name, 
            'website'           => $company->website ?? $request->website,   
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
        ], 201); 
    }

    /* ============================
        EDIT JOB FORM DATA
    ============================ */
    public function edit($id)
    {
        $job = Job::with(['employer', 'company'])->findOrFail($id);
        $user = Auth::user();

        // Authorization check 
        if ($user->role !== 'admin' && $job->employer_id !== ($user->employer->id ?? null)) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        $company = $user->employer->company ?? null; 
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

        // Authorization check: 
        $isJobOwner = $job->employer_id === ($user->employer->id ?? null);
        if ($user->role !== 'admin' && !$isJobOwner) {
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

        // Handle cover image upload 
        $cover_image = $job->cover_image; 
        
        if ($request->hasFile('cover_image')) {
            // New file uploaded:
            
            // 1. Delete old image if it exists
            if ($job->cover_image) {
                Storage::disk('public')->delete($job->cover_image); 
            }
            
            // 2. Upload new file
            $path = $request->file('cover_image')->store('uploads/jobs', 'public');
            $cover_image = $path;
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

        // Authorization check: 
        $isJobOwner = $job->employer_id === ($user->employer->id ?? null);
        if ($user->role !== 'admin' && !$isJobOwner) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        if ($job->cover_image) {
            Storage::disk('public')->delete($job->cover_image); 
        }

        $job->delete();
        
        return response()->json(['message' => 'Job deleted successfully.']);
    }
}