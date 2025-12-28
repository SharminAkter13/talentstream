<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Category;
use App\Models\JobLocation;
use App\Models\JobType;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // List logged-in employer's jobs
    public function index(Request $request)
    {
        $jobs = Job::where('employer_id', $request->user()->id)
            ->with(['category', 'jobLocation', 'jobType'])
            ->orderBy('id', 'desc')
            ->get();

        return response()->json(['jobs' => $jobs]);
    }

    // Dropdown data for create/edit job form
    public function create()
    {
        return response()->json([
            'categories' => Category::all(),
            'locations' => JobLocation::all(),
            'types' => JobType::all(),
        ]);
    }

    // Store job
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'company_name'      => 'required|string|max:255',
            'category_id'       => 'required|integer',
            'job_location_id'   => 'required|integer',
            'job_type_id'       => 'required|integer',
            'description'       => 'required|string',
            'status'            => 'required|string|in:active,inactive',
            'cover_image'       => 'nullable|image|max:2048'
        ]);

        // Upload cover image
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('jobs', 'public');
        }

        $validated['employer_id'] = $request->user()->id;
        $validated['user_email'] = $request->user()->email;

        $job = Job::create($validated);

        return response()->json([
            'message' => 'Job created successfully',
            'data' => $job
        ], 201);
    }

    // Show job
    public function show($id)
    {
        $job = Job::with(['category', 'jobLocation', 'jobType'])
            ->findOrFail($id);

        return response()->json($job);
    }

    // Update job
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $validated = $request->validate([
            'title'             => 'sometimes|string|max:255',
            'company_name'      => 'sometimes|string|max:255',
            'category_id'       => 'sometimes|integer',
            'job_location_id'   => 'sometimes|integer',
            'job_type_id'       => 'sometimes|integer',
            'description'       => 'sometimes|string',
            'status'            => 'sometimes|string|in:active,inactive',
            'cover_image'       => 'nullable|image|max:2048'
        ]);

        // Update cover image
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('jobs', 'public');
        }

        $job->update($validated);

        return response()->json([
            'message' => 'Job updated successfully',
            'data' => $job
        ]);
    }

    // Delete job
    public function destroy($id)
    {
        Job::findOrFail($id)->delete();

        return response()->json(['message' => 'Job deleted successfully']);
    }
}
