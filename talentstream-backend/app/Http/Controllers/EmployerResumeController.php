<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resume;

class EmployerResumeController extends Controller
{
    public function index()
    {
        // Get all resumes (optionally filter by status, visibility, etc.)
        $resumes = Resume::with(['educations', 'experiences', 'skills'])
            ->latest()
            ->get();

        return view('portal_pages.employers.browse_resume', compact('resumes'));
    }

    public function show($id)
    {
        $resume = Resume::with(['educations', 'experiences', 'skills'])
            ->findOrFail($id);

        return view('portal_pages.employers.resume_details', compact('resume'));
    }
}