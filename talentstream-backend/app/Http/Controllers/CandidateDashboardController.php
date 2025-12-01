<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CandidateDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $applications = Application::with('job.employer')
            ->where('candidate_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'applications'       => $applications,
            'totalApplications'  => $applications->count(),
            'totalInterviews'    => $applications->where('status', 'interview')->count(),
            'totalOffers'        => $applications->where('status', 'accepted')->count(),
        ]);
    }
}
