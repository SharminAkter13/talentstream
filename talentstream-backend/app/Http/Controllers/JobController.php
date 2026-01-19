<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Category;
use App\Models\JobLocation;
use App\Models\JobType;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // List logged-in employer's jobs (For Dashboard Table)
    public function index(Request $request)
    {
        $jobs = Job::where('employer_id', $request->user()->id)
            ->with(['category', 'jobLocation', 'jobType'])
            ->orderBy('id', 'desc')
            ->get();

        return response()->json(['jobs' => $jobs]);
    }

    // Dropdown data (For both Portal and Dashboard Forms)
    public function create()
    {
        return response()->json([
            'categories' => Category::all(),
            'locations' => JobLocation::all(),
            'types' => JobType::all(),
        ]);
    }

    // Store job (POST /api/employer/jobs)
    public function store(Request $request)
{
    $validated = $request->validate([
        'title'                => 'required|string|max:255',
        'company_name'         => 'required|string',
        'category_id'          => 'required|integer',
        'job_location_id'      => 'required|integer',
        'job_type_id'          => 'required|integer',
        'job_skill_id'         => 'nullable|integer', // Added skill
        'description'          => 'required|string',
        'salary_min'           => 'nullable|numeric',
        'salary_max'           => 'nullable|numeric',
        'num_vacancies'        => 'nullable|integer',
        'application_deadline' => 'nullable|date',
        'status'               => 'required|string|in:active,inactive',
        'cover_image'          => 'nullable|image|max:2048'
    ]);

    if ($request->hasFile('cover_image')) {
        $validated['cover_image'] = $request->file('cover_image')->store('jobs', 'public');
    }

    // AUTO-FILL LOGIC
    $validated['employer_id'] = $request->user()->id;
    $validated['posted_date'] = now(); // Auto-fill current date

    $job = Job::create($validated);

    return response()->json(['message' => 'Job created successfully', 'data' => $job], 201);
}

    // Show single job (For Editing or Details)
    public function show($id)
    {
        $job = Job::with(['category', 'jobLocation', 'jobType'])
            ->findOrFail($id);

        return response()->json($job);
    }

    // Update job (POST /api/employer/jobs/{id})
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $validated = $request->validate([
            'title'                => 'sometimes|string|max:255',
            'company_name'         => 'sometimes|string|max:255',
            'category_id'          => 'sometimes|integer|exists:categories,id',
            'job_location_id'      => 'sometimes|integer|exists:job_locations,id',
            'job_type_id'          => 'sometimes|integer|exists:job_types,id',
            'description'          => 'sometimes|string',
            'salary_min'           => 'nullable|numeric',
            'salary_max'           => 'nullable|numeric',
            'num_vacancies'        => 'nullable|integer',
            'application_deadline' => 'nullable|date',
            'status'               => 'sometimes|string|in:active,inactive',
            'cover_image'          => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('jobs', 'public');
        }

        $job->update($validated);

        return response()->json([
            'message' => 'Job updated successfully',
            'data' => $job
        ]);
    }

    public function destroy($id)
    {
        Job::findOrFail($id)->delete();
        return response()->json(['message' => 'Job deleted successfully']);
    }
}