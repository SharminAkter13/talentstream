<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Category;
use App\Models\JobLocation;
use App\Models\JobType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controller as BaseController;

class PortalJobController extends BaseController
{
    public function __construct()
    {
        // Use your API authentication middleware instead of 'auth:web'
        $this->middleware('api.auth');
    }

    /**
     * Fetch jobs for the authenticated employer.
     */
    public function index()
    {
        $user = Auth::user();
        $employer = $user->employer;

        if (!$employer) {
            return response()->json(['message' => 'Employer profile not found.'], 404);
        }

        $jobs = Job::where('employer_id', $employer->id)
            ->with(['jobLocation', 'jobType', 'category'])
            ->latest()
            ->get();

        return response()->json($jobs);
    }

    /**
     * Provide necessary data for the "Post a Job" form.
     */
    public function getFormData()
    {
        return response()->json([
            'jobLocations' => JobLocation::all(),
            'jobTypes' => JobType::all(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created job.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'job_location_id' => 'required|exists:job_locations,id',
            'job_type_id' => 'required|exists:job_types,id',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'application_email' => 'required|email',
            'company_name' => 'required|string',
            'cover_img_file' => 'nullable|image|max:2048',
        ]);

        $employer = Auth::user()->employer;

        $coverImage = null;
        if ($request->hasFile('cover_img_file')) {
            $coverImage = $request->file('cover_img_file')->store('job_covers', 'public');
        }

        $job = Job::create(array_merge($request->all(), [
            'user_id' => Auth::id(),
            'employer_id' => $employer->id,
            'cover_image' => $coverImage,
            'status' => 'pending',
        ]));

        return response()->json(['message' => 'Job posted successfully!', 'job' => $job], 201);
    }

    /**
     * Delete a job.
     */
    public function destroy(Job $job)
    {
        // Ensure user owns the job
        if ($job->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($job->cover_image) {
            Storage::disk('public')->delete($job->cover_image);
        }

        $job->delete();

        return response()->json(['message' => 'Job deleted successfully!']);
    }
public function latestJobs()
{
    $jobs = Job::with(['category', 'employer.company', 'jobLocation'])
        ->where('status', 'active')
        ->latest()
        ->take(6)
        ->get();

    return response()->json($jobs);
}

/**
 * Returns latest blogs (Prevents the 404 error)
 */
public function latestBlogs()
{
    // Return empty array for now so the frontend doesn't crash
    return response()->json([]);
}
}