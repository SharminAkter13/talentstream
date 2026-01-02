<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
   
public function index()
{
    $user = Auth::user();

    // 1. Employer Logic (Role 2)
    if ($user->role_id == 2) {
        $employer = \App\Models\Employer::where('user_id', $user->id)->first();
        
        $applications = Application::with(['job', 'candidate.user'])
            ->whereHas('job', function($q) use ($employer) {
                $q->where('employer_id', $employer->id);
            })
            ->latest()
            ->paginate(10);
    } 
    // 2. Candidate Logic (Role 3)
    else {
        $candidate = \App\Models\Candidate::where('user_id', $user->id)->first();

        $applications = Application::with(['job.employer.user', 'candidate.user'])
            ->where('candidate_id', $candidate->id)
            ->latest()
            ->paginate(10);
    }

    return response()->json(['applications' => $applications]);
}
    /**
     * Store a newly created application.
     */
    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|exists:jobs,id',
            // Ensure React handles file upload as form-data
            'resume' => 'required|mimes:pdf,doc,docx|max:2048', 
            'cover_letter' => 'nullable|string',
        ]);

        $candidate = Auth::user()->candidate;

        if (!$candidate) {
            // Changed to return JSON error (403 Forbidden)
            return response()->json(['error' => 'Only candidates can apply for jobs.'], 403);
        }

        // Prevent duplicate applications
        $alreadyApplied = Application::where('job_id', $request->job_id)
            ->where('candidate_id', $candidate->id)
            ->exists();

        if ($alreadyApplied) {
            // Changed to return JSON error (409 Conflict)
            return response()->json(['error' => 'You have already applied to this job.'], 409);
        }

        // Upload resume
        $resumePath = $request->file('resume')->store('resumes', 'public');

        // Create new application
        $application = Application::create([
            'job_id' => $request->job_id,
            'candidate_id' => $candidate->id,
            'applied_date' => now(),
            'resume' => $resumePath,
            'cover_letter' => $request->cover_letter,
            'status' => 'active',
        ]);

        // Changed to return JSON (201 Created)
        return response()->json([
            'message' => 'Your application has been submitted successfully!',
            'application' => $application
        ], 201);
    }

    /**
     * Display a specific application.
     */
public function show($id)
    {
        // Load with nested user to get names
        $application = Application::with(['job', 'candidate.user', 'employer.user'])->findOrFail($id);
        return response()->json(['application' => $application]);
    }
}