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

        // Admin: can see all applications
        if ($user->role?->name === 'admin') {
            $applications = Application::with(['job', 'candidate'])
                ->latest()
                ->paginate(10);
        }
        // Candidate: can see only their own
        elseif ($user->role?->name === 'candidate') {
            $candidate = $user->candidate;

            if (!$candidate) {
                return back()->with('error', 'No candidate profile found.');
            }

            $applications = Application::with(['job', 'candidate'])
                ->where('candidate_id', $candidate->id)
                ->latest()
                ->paginate(10);
        }
        // Employer (optional): see applications for their jobs
        elseif ($user->role?->name === 'employer') {
            $employer = $user->employer;

            if (!$employer) {
                return back()->with('error', 'No employer profile found.');
            }

            $applications = Application::with(['job', 'candidate'])
                ->whereHas('job', fn($q) => $q->where('employer_id', $employer->id))
                ->latest()
                ->paginate(10);
        }
        // Anyone else — deny access
        else {
            abort(403, 'Unauthorized access.');
        }

        return view('pages.applications.index', compact('applications'));
    }

    /**
     * Show the form for creating a new application.
     */
    public function create($jobId)
    {
        $job = Job::findOrFail($jobId);
        return view('pages.applications.create', compact('job'));
    }

    /**
     * Store a newly created application.
     */
    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'resume' => 'required|mimes:pdf,doc,docx|max:2048',
            'cover_letter' => 'nullable|string',
        ]);

        $candidate = Auth::user()->candidate;

        if (!$candidate) {
            return back()->with('error', 'Only candidates can apply for jobs.');
        }

        // Prevent duplicate applications
        $alreadyApplied = Application::where('job_id', $request->job_id)
            ->where('candidate_id', $candidate->id)
            ->exists();

        if ($alreadyApplied) {
            return back()->with('error', 'You have already applied to this job.');
        }

        // Upload resume
        $resumePath = $request->file('resume')->store('resumes', 'public');

        // Create new application
        Application::create([
            'job_id' => $request->job_id,
            'candidate_id' => $candidate->id,
            'applied_date' => now(),
            'resume' => $resumePath,
            'cover_letter' => $request->cover_letter,
            'status' => 'active',
        ]);

        return redirect()
            ->route('jobs.show', $request->job_id)
            ->with('success', 'Your application has been submitted successfully!');
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
            abort(403, 'Unauthorized access.');
        }

        // Employer: can only see applications for their jobs
        if ($user->role?->name === 'employer') {
            $employer = $user->employer;

            if (!$employer || $application->job->employer_id !== $employer->id) {
                abort(403, 'Unauthorized access.');
            }
        }

        // Admin: full access — no restriction

        return view('pages.applications.show', compact('application'));
    }
}
