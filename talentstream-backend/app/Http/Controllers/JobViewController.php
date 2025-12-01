<?php

namespace App\Http\Controllers;

use App\Models\JobView;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController; // Ensure correct inheritance
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Add AuthorizesRequests trait

class JobViewController extends BaseController
{
    use AuthorizesRequests;

    /**
     * Require authentication for all actions.
     * Restrict index (listing all views) to 'admin' role.
     */
    public function __construct()
    {
        // Require authentication to ensure Auth::user() is available in store()
        $this->middleware('auth');

        // Only admins (or authorized users) should see the full list of job views
        $this->middleware('can:view-all-job-views')->only(['index']);
    }

    /**
     * Record a job view when a user lands on the job page.
     * Uses Route Model Binding (Job $job).
     */
    public function store(Job $job)
    {
        $user = Auth::user();

        // Check if the user is authenticated and is not the employer who posted the job
        // We only want to track views from external candidates/viewers, not the employer themselves.
        if ($user && (!isset($job->employer_id) || $job->employer_id !== $user->id)) {
             // Create or update the view record
            JobView::updateOrCreate(
                [
                    'job_id' => $job->id,
                    'user_id' => $user->id,
                ],
                [
                    'viewed_at' => now(),
                ]
            );
        }
        // Fallback or if the user is not authenticated, still redirect to job show page
        return redirect()->route('jobs.show', $job->id);
    }

    /**
     * List all job views (typically for admin use).
     */
    public function index()
    {
        // Fetch views with related job and the user who viewed it (viewer)
        $views = JobView::with(['job', 'viewer'])->latest()->paginate(25);
        return view('pages.job_views.index', compact('views'));
    }
}