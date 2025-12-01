<?php

namespace App\Http\Controllers;

use App\Models\JobSkill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

// Refactored JobSkillController to use standard RESTful conventions,
// Route Model Binding, and proper validation, similar to JobLocationController.
class JobSkillController extends BaseController
{
    use AuthorizesRequests;

    /**
     * Optional: Apply auth middleware if necessary, similar to JobLocationController.
     */
    public function __construct()
    {
        // Example: $this->middleware('auth');
        // Example: $this->middleware('can:manage-skills')->only(['create', 'store', 'edit', 'update', 'destroy']);
    }

    /**
     * Display a listing of the job skills.
     */
    public function index()
    {
        // Use pagination if the list grows large
        $jobSkills = JobSkill::latest()->paginate(10);
        return view('pages.job-skill.index', compact('jobSkills'));
    }

    /**
     * Show the form for creating a new job skill.
     */
    public function create()
    {
        return view('pages.job-skill.create');
    }

    /**
     * Store a newly created job skill in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255|unique:job_skills,name',
            'amount' => 'nullable|integer|min:0', // Assuming 'amount' is an integer count
            'price'  => 'nullable|numeric|min:0', // Assuming 'price' is a monetary value
        ]);

        JobSkill::create($request->only(['name', 'amount', 'price']));

        return Redirect::route('job_skills.index')->with('success', 'Job skill created successfully.');
    }

    /**
     * Show the form for editing the specified job skill.
     * Uses Route Model Binding (JobSkill $jobSkill).
     */
    public function edit(JobSkill $jobSkill)
    {
        // The URL route variable should be named 'jobSkill' to match the type hint
        return view('pages.job-skill.edit', compact('jobSkill'));
    }

    /**
     * Update the specified job skill in storage.
     * Uses Route Model Binding (JobSkill $jobSkill).
     */
    public function update(Request $request, JobSkill $jobSkill)
    {
        $request->validate([
            'name'   => 'required|string|max:255|unique:job_skills,name,' . $jobSkill->id, // unique rule ignores current model ID
            'amount' => 'nullable|integer|min:0',
            'price'  => 'nullable|numeric|min:0',
        ]);

        $jobSkill->update($request->only(['name', 'amount', 'price']));

        return Redirect::route('job_skills.index')->with('success', 'Job skill updated successfully.');
    }

    /**
     * Remove the specified job skill from storage.
     * Uses Route Model Binding (JobSkill $jobSkill).
     */
    public function destroy(JobSkill $jobSkill)
    {
        $jobSkill->delete();
        return Redirect::route('job_skills.index')->with('success', 'Job skill deleted successfully.');
    }
}