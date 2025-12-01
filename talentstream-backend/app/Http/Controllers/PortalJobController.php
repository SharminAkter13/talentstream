<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Company;
use App\Models\Employer;
use App\Models\JobLocation;
use App\Models\JobType;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PortalJobController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // Restrict access to authenticated users with the 'employer' role
        $this->middleware('auth:web');
        $this->middleware('can:isEmployer'); // Assuming a gate/policy 'isEmployer'
    }

    /**
     * Show all jobs posted by the authenticated employer.
     */
    public function index()
    {
        $employer = Auth::user()->employer;

        if (!$employer) {
            return redirect()->route('dashboard')->with('error', 'Employer profile not found.');
        }

        $jobs = Job::where('employer_id', $employer->id)
            ->with(['jobLocation', 'jobType', 'category'])
            ->latest()
            ->paginate(10);

        return view('portal_pages.employers.manage_job', compact('jobs'));
    }

    /**
     * Show the form for creating a new job, pre-populating company info and necessary dropdowns.
     */
    public function create()
    {
        $user = Auth::user();

        // Retrieve the Employer record linked to the authenticated user
        $employer = $user->employer;

        // Retrieve the Company record associated with the employer
        $company = $employer ? Company::find($employer->company_id) : null;

        // Required dropdown data
        $jobLocations = JobLocation::all();
        $jobTypes = JobType::all();
        $categories = Category::all();

        return view(
            'portal_pages.employers.add_job',
            compact('company', 'user', 'employer', 'jobLocations', 'jobTypes', 'categories')
        );
    }

    /**
     * Store a newly created job in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'job_location_id' => 'required|integer|exists:job_locations,id',
            'job_type_id' => 'required|integer|exists:job_types,id',
            'category_id' => 'required|integer|exists:categories,id',
            'description' => 'required|string',
            'application_email' => 'required|email|max:255',
            'closing_date' => 'nullable|date|after_or_equal:today',
            'company_name' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'cover_img_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tags' => 'nullable|string',
            'application_url' => 'nullable|url|max:255',
        ]);

        $employer = Auth::user()->employer;

        // Handle cover image upload
        $coverImage = null;
        if ($request->hasFile('cover_img_file')) {
            $coverImage = $request->file('cover_img_file')->store('job_covers', 'public');
        }

        Job::create([
            'user_id' => Auth::id(), // Link to the user who posted it (optional, but useful)
            'employer_id' => $employer->id, // MANDATORY: Link to the employer profile ID
            'title' => $request->title,
            'job_location_id' => $request->job_location_id,
            'job_type_id' => $request->job_type_id,
            'category_id' => $request->category_id,
            'tags' => $request->tags,
            'description' => $request->description,
            'application_email' => $request->application_email,
            'application_url' => $request->application_url,
            'closing_date' => $request->closing_date,
            'company_name' => $request->company_name,
            'website' => $request->website,
            'cover_image' => $coverImage,
            'status' => 'pending', // Default status upon creation
        ]);

        return redirect()->route('portal.jobs.index')
            ->with('success', 'Job posted successfully! It is now pending approval.');
    }

    /**
     * Display the specified job.
     */
    public function show(Job $job)
    {
        $this->authorize('view', $job); // Ensure employer can only view their own jobs
        return view('portal_pages.employers.job_details', compact('job'));
    }

    /**
     * Show the form for editing the specified job.
     */
    public function edit(Job $job)
    {
        $this->authorize('update', $job); // Ensure employer can only edit their own jobs

        $jobLocations = JobLocation::all();
        $jobTypes = JobType::all();
        $categories = Category::all();

        return view(
            'portal_pages.employers.edit_job',
            compact('job', 'jobLocations', 'jobTypes', 'categories')
        );
    }

    /**
     * Update the specified job in storage.
     */
    public function update(Request $request, Job $job)
    {
        $this->authorize('update', $job); // Ensure employer can only update their own jobs

        $request->validate([
            'title' => 'required|string|max:255',
            'job_location_id' => 'required|integer|exists:job_locations,id',
            'job_type_id' => 'required|integer|exists:job_types,id',
            'category_id' => 'required|integer|exists:categories,id',
            'description' => 'required|string',
            'application_email' => 'required|email|max:255',
            'closing_date' => 'nullable|date|after_or_equal:today',
            'company_name' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'cover_img_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tags' => 'nullable|string',
            'application_url' => 'nullable|url|max:255',
        ]);

        $data = $request->only([
            'title', 'job_location_id', 'job_type_id', 'category_id', 'tags',
            'description', 'application_email', 'application_url', 'closing_date',
            'company_name', 'website',
        ]);

        // Handle cover image update
        if ($request->hasFile('cover_img_file')) {
            // Delete old cover image if it exists
            if ($job->cover_image) {
                Storage::disk('public')->delete($job->cover_image);
            }
            $data['cover_image'] = $request->file('cover_img_file')->store('job_covers', 'public');
        }

        $job->update($data);

        return redirect()->route('portal.jobs.index')
            ->with('success', 'Job updated successfully!');
    }

    /**
     * Remove the specified job from storage.
     */
    public function destroy(Job $job)
    {
        $this->authorize('delete', $job); // Ensure employer can only delete their own jobs

        // Delete cover image from storage if it exists
        if ($job->cover_image) {
            Storage::disk('public')->delete($job->cover_image);
        }

        $job->delete();

        return redirect()->route('portal.jobs.index')
            ->with('success', 'Job deleted successfully!');
    }
}