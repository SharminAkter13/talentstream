<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Category;
use App\Models\JobLocation;
use App\Models\JobSkill;
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

    // Store job (POST /api/employer/jobs)
public function create(Request $request)
{
    $user = $request->user();

    // We need to load the company relationship or access the attribute
    // based on your screenshot showing 'company_name'
    return response()->json([
        'categories' => Category::all(),
        'locations'  => JobLocation::all(),
        'types'      => JobType::all(),
        'skills'     => JobSkill::all(),

        'employer' => [
            'id'    => $user->id,
            'email' => $user->email,
        ],
        'company' => [
            // Adjust this to match your model's attribute or relationship
            'id'   => $user->company->id ?? null,
            'name' => $user->company->company_name ?? 'Company Name Not Found', 
        ],
    ]);
}
    // ===============================
    // STORE JOB
    // ===============================
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'                => 'required|string|max:255',
            'category_id'          => 'required|integer',
            'job_type_id'          => 'required|integer',
            'job_skill_id'         => 'nullable|integer',
            'job_location_id'      => 'required|integer',
            'description'          => 'required|string',
            'salary_min'           => 'nullable|numeric',
            'salary_max'           => 'nullable|numeric',
            'num_vacancies'        => 'nullable|integer',
            'application_deadline' => 'nullable|date',
            'status'               => 'required|in:active,inactive',
        ]);

        // 🔐 FK AUTO-FILL (SECURE)
        $validated['employer_id'] = $request->user()->id;
        $validated['company_id'] = $request->user()->company_id;
        $validated['posted_date'] = now();

        $job = Job::create($validated);

        return response()->json([
            'message' => 'Job created successfully',
            'data'    => $job
        ], 201);
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