<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Application; // Added Application model for potential future use or completeness
use Illuminate\Support\Facades\Auth; // Added Auth facade for explicit use

class EmployerManageJobController extends Controller
{
  
    public function index()
    {
        // Resolved 'Undefined method 'id'' warning by using auth()->user()->id
        $employerId = Auth::id(); // Use Auth::id() for direct ID retrieval, or
                                 // $employerId = auth()->user()->id; // This also works
        
        // Use Auth::id() for direct ID retrieval
        $jobs = Job::withCount('applications')
            ->where('employer_id', $employerId)
            ->orderBy('created_at', 'desc')
            ->paginate(10); // Still use paginate for API for easy frontend consumption

        // Converted from return view(...) to return response()->json(...)
        return response()->json([
            'jobs' => $jobs,
            'message' => 'Jobs retrieved successfully.'
        ]);
    }

    /**
     * View all applications for a specific job posted by the authenticated employer.
     */
    public function viewApplications($jobId)
    {
        // Resolved 'Undefined method 'id'' warning by using Auth::id()
        $employerId = Auth::id();

        // Eager load applications and the candidate user for each application
        $job = Job::with(['applications.candidate'])
            ->where('employer_id', $employerId)
            ->findOrFail($jobId);

        // Converted from return view(...) to return response()->json(...)
        return response()->json([
            'job' => $job,
            'applications' => $job->applications,
            'message' => 'Applications retrieved successfully.'
        ]);
    }
}