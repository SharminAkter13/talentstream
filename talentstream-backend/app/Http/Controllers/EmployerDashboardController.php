<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        $totalCandidatesApplied = Application::whereIn('job_id', $jobs->pluck('id'))->count();

        $newApplicationsCount = Application::whereIn('job_id', $jobs->pluck('id'))
            ->where('status', 'new')
            ->count();

        return response()->json([
            'jobs' => $jobs,
            'totalJobsPosted' => $totalJobsPosted,
            'totalJobViews' => $totalJobViews,
            'totalCandidatesApplied' => $totalCandidatesApplied,
            'newApplicationsCount' => $newApplicationsCount,
        ]);
    }
}
