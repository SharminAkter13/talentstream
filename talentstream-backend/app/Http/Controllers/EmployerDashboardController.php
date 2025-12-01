<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job; 
use App\Models\Application; 
use Illuminate\Support\Facades\Auth; 

class EmployerDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
       
        $employerId = $user->id;

        $jobs = Job::where('employer_id', $employerId)
            ->withCount(['applications', 'viewers'])
            ->get();

        $totalJobsPosted = $jobs->count();
        $totalJobViews = $jobs->sum('viewers_count');
        
        // Count total applications across all jobs posted by this employer
        $totalCandidatesApplied = Application::whereIn('job_id', $jobs->pluck('id'))->count();

        // Count new applications
        $newApplicationsCount = Application::whereIn('job_id', $jobs->pluck('id'))
            ->where('status', 'new')
            ->count();

        // Returns JSON response for the React frontend
        return response()->json([
            'jobs' => $jobs,
            'totalJobsPosted' => $totalJobsPosted,
            'totalJobViews' => $totalJobViews,
            'totalCandidatesApplied' => $totalCandidatesApplied,
            'newApplicationsCount' => $newApplicationsCount,
        ]);
    }
}