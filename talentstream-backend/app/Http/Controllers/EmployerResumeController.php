<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resume;

class EmployerResumeController extends Controller
{
    /**
     * Display a paginated list of resumes available to employers.
     * Employers should only see resumes marked as public or those accessible via their package.
     */
    public function index()
    {
        // TODO: Implement filtering logic here to ensure only resumes available to the authenticated employer
        // (e.g., based on package or candidate privacy settings) are returned.

        $resumes = Resume::with(['educations', 'experiences', 'skills', 'candidate.user'])
            ->latest()
            ->paginate(10); // Changed from get() to paginate(10) for a standard API list endpoint

        // Converted from view to JSON
        return response()->json([
            'resumes' => $resumes,
            'message' => 'Resumes retrieved successfully.'
        ]);
    }

    /**
     * Display the details of a specific resume.
     * Employer should only be able to view a resume if they have access.
     */
    public function show($id)
    {
        // TODO: Implement authorization check here to verify the employer has permission
        // to view this specific resume before returning the data.
        
        $resume = Resume::with(['educations', 'experiences', 'skills', 'candidate.user'])
            ->findOrFail($id);

        // Converted from view to JSON
        return response()->json([
            'resume' => $resume,
            'message' => 'Resume details retrieved successfully.'
        ]);
    }
}