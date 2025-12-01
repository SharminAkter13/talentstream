<?php

namespace App\Http\Controllers;

use App\Models\Application; // <-- FIX: This was missing and caused the error
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Added for explicit authentication access

class CandidateDashboardController extends Controller
{
    /**
     * Retrieves dashboard data for the authenticated candidate.
     */
    public function index()
    {
        // 1. Get the authenticated user
        $user = Auth::user(); 

        // 2. Safely check if the user has a linked candidate profile
        if (!$user->candidate) {
            return response()->json([
                'error' => 'Candidate profile not found.'
            ], 404);
        }

        // Use the ID from the candidate relationship (assuming candidate profile links to the User model)
        // Adjust 'candidate_id' if your applications table uses 'user_id' instead.
        $candidateId = $user->candidate->id; 

        $applications = Application::with('job.employer')
            ->where('candidate_id', $candidateId)
            ->latest()
            ->get();

        // 3. Return React-friendly JSON data
        return response()->json([
            'applications'       => $applications,
            'totalApplications'  => $applications->count(),
            'totalInterviews'    => $applications->where('status', 'interview')->count(),
            'totalOffers'        => $applications->where('status', 'accepted')->count(),
            'user'               => $user->only(['id', 'name', 'email']), // Return basic user info
        ]);
    }
}