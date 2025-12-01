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
        $applications = collect(); // Initialize a collection

        // Admin: can see all applications
        if ($user->role?->name === 'admin') {
            $applications = Application::with(['job', 'candidate'])
                ->latest()
                ->paginate(10);
        }
        elseif ($user->role?->name === 'candidate') {
            $candidate = $user->candidate;

            if (!$candidate) {
                // Changed to return JSON error
                return response()->json(['error' => 'No candidate profile found.'], 404);
            }

            $applications = Application::with(['job', 'candidate'])
                ->where('candidate_id', $candidate->id)
                ->latest()
                ->paginate(10);
        }
        // Employer: see applications for their jobs
        elseif ($user->role?->name === 'employer') {
            $employer = $user->employer;

            if (!$employer) {
                // Changed to return JSON error
                return response()->json(['error' => 'No employer profile found.'], 404);
            }

            $applications = Application::with(['job', 'candidate'])
                ->whereHas('job', fn($q) => $q->where('employer_id', $employer->id))
                ->latest()
                ->paginate(10);
        }
        // Anyone else — deny access
        else {
            // Changed to return JSON error (403 Forbidden)
            return response()->json(['error' => 'Unauthorized access.'], 403);
        }
        
        // Final return for success path
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
        $application = Application::with(['job', 'candidate'])->findOrFail($id);
        $user = Auth::user();

        // Candidate: can only see their own
        if ($user->role?->name === 'candidate' && $application->candidate_id !== $user->candidate->id) {
            abort(403, 'Unauthorized access.'); // Using abort is fine for a quick 403
        }

        // Employer: can only see applications for their jobs
        if ($user->role?->name === 'employer') {
            $employer = $user->employer;

            if (!$employer || $application->job->employer_id !== $employer->id) {
                abort(403, 'Unauthorized access.');
            }
        }

        // Admin: full access — no restriction

        // Changed to return JSON
        return response()->json(['application' => $application]);
    }
}