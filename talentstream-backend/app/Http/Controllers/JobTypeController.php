<?php

namespace App\Http\Controllers;

use App\Models\JobType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobTypeController extends Controller
{
    // List all types for the React table and dropdowns
    public function index()
    {
        $types = JobType::all();
        return response()->json(['job_types' => $types]);
    }

    // Store a new job type (Full-time, Remote, etc.)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:job_types,name',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jobType = JobType::create($request->only(['name', 'description']));

        return response()->json([
            'message' => 'Job Type created successfully',
            'job_type' => $jobType
        ], 201);
    }

    // Delete a job type
    public function destroy($id)
    {
        $jobType = JobType::findOrFail($id);
        $jobType->delete();
        return response()->json(['message' => 'Job Type deleted successfully']);
    }
}