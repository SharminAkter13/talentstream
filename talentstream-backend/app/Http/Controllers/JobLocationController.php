<?php

namespace App\Http\Controllers;

use App\Models\JobLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController; // Import Laravel's base controller
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Import necessary trait

// Change inheritance to BaseController to ensure access to methods like middleware()
class JobLocationController extends BaseController
{
    // Use the trait to get features like authorization checks
    use AuthorizesRequests;

    /**
     * Require authentication for all actions.
     */
    public function __construct()
    {
        // This middleware call is now correctly resolved by BaseController inheritance
        $this->middleware('auth');

        // Optional: Restrict CUD operations to specific roles (e.g., admin)
        // $this->middleware('can:manage-locations')->only(['create', 'store', 'edit', 'update', 'destroy']);
    }

    // List all job locations
    public function index()
    {
        $locations = JobLocation::latest()->paginate(10);
        return view('pages.job_locations.index', compact('locations'));
    }

    // Show create form
    public function create()
    {
        return view('pages.job_locations.create');
    }

    // Store new location
    public function store(Request $request)
    {
        $request->validate([
            'country' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'postal_code' => 'nullable|string|max:20',
        ]);

        JobLocation::create($request->all());

        return redirect()->route('job_locations.index')->with('success', 'Job location added successfully.');
    }

    // Show edit form
    public function edit(JobLocation $jobLocation)
    {
        return view('pages.job_locations.edit', compact('jobLocation'));
    }

    // Update existing location
    public function update(Request $request, JobLocation $jobLocation)
    {
        $request->validate([
            'country' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'postal_code' => 'nullable|string|max:20',
        ]);

        $jobLocation->update($request->all());

        return redirect()->route('job_locations.index')->with('success', 'Job location updated successfully.');
    }

    // Delete location
    public function destroy(JobLocation $jobLocation)
    {
        $jobLocation->delete();
        return redirect()->route('job_locations.index')->with('success', 'Job location deleted successfully.');
    }
}