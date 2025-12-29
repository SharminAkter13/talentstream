<?php

namespace App\Http\Controllers;

use App\Models\JobView;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;

class JobViewController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['index']);
    }

    /**
     * Track a view via API
     */
    public function store(Request $request, $jobId)
    {
        $job = Job::findOrFail($jobId);
        $user = Auth::guard('sanctum')->user();

        // If user is logged in, track the view (ignore the employer who posted it)
        if ($user && $job->employer_id !== ($user->employer->id ?? null)) {
            JobView::updateOrCreate(
                [
                    'job_id' => $job->id,
                    'viewer_id' => $user->id, // Matching your SQL schema column 'viewer_id'
                ],
                [
                    'viewed_at' => now(),
                ]
            );

            return response()->json(['message' => 'View recorded']);
        }

        return response()->json(['message' => 'Anonymous view or Owner view - not tracked'], 200);
    }

    /**
     * Admin/Employer View Stats
     */
    public function index()
    {
        $user = Auth::user();
        $query = JobView::with(['job', 'viewer']);

        // If employer, only show views for THEIR jobs
        if ($user->role_id === 2) {
            $employerId = $user->employer->id;
            $query->whereHas('job', function($q) use ($employerId) {
                $q->where('employer_id', $employerId);
            });
        }

        $views = $query->latest()->paginate(20);
        return response()->json(['job_views' => $views]);
    }
}