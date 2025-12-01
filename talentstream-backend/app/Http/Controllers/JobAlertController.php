<?php

namespace App\Http\Controllers;

use App\Models\JobAlert;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator; // Added for explicit validation control
use Illuminate\Routing\Controller as BaseController; // Added for @mixin reference

/**
 * @mixin \Illuminate\Routing\Controller
 */
class JobAlertController extends BaseController
{
    use AuthorizesRequests;
    
    /**
     * Constructor for JobAlertController.
     * * @mixin \Illuminate\Routing\Controller
     */
    public function __construct()
    {
        // This middleware is standard for Candidate's alerts and will ensure the user is authenticated.
        $this->middleware('auth:sanctum'); // Use 'auth:sanctum' for API routes
    }

    /**
     * Display a paginated list of job alerts for the authenticated user.
     */
    public function index()
    {
        $jobAlerts = JobAlert::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Converted from view to JSON response
        return response()->json([
            'jobAlerts' => $jobAlerts,
            'message' => 'Job alerts retrieved successfully.'
        ]);
    }

    /**
     * Return the necessary data for creating a job alert (empty for this simple case).
     */
    public function create()
    {
        // Converted from view to JSON response (can be empty or contain lookup data if needed)
        return response()->json([
            'message' => 'Ready to create job alert.'
        ]);
    }

    /**
     * Store a newly created job alert in storage.
     */
    public function store(Request $request)
    {
        // Explicitly defining validation rules
        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'keywords'      => 'nullable|string|max:255',
            'location'      => 'nullable|string|max:255',
            // Note: contract_type needs to be adjusted for API if 'full‑time' is using a special hyphen
            'contract_type' => 'required|string|in:full-time,part-time', 
            'frequency'     => 'required|string|in:daily,weekly,monthly',
        ]);

        $data['user_id'] = Auth::id();

        $jobAlert = JobAlert::create($data);

        // Converted from redirect to JSON (201 Created)
        return response()->json([
            'message' => 'Job alert created successfully.',
            'jobAlert' => $jobAlert
        ], 201);
    }

    /**
     * Display the specified job alert for editing.
     */
    public function edit(JobAlert $jobAlert)
    {
        // Ensure the user owns this alert
        $this->authorize('update', $jobAlert);

        // Converted from view to JSON response
        return response()->json([
            'jobAlert' => $jobAlert,
            'message' => 'Job alert retrieved for editing.'
        ]);
    }

    /**
     * Update the specified job alert in storage.
     */
    public function update(Request $request, JobAlert $jobAlert)
    {
        $this->authorize('update', $jobAlert);

        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'keywords'      => 'nullable|string|max:255',
            'location'      => 'nullable|string|max:255',
            // Note: contract_type needs to be adjusted for API if 'full‑time' is using a special hyphen
            'contract_type' => 'required|string|in:full-time,part-time',
            'frequency'     => 'required|string|in:daily,weekly,monthly',
        ]);

        $jobAlert->update($data);

        // Converted from redirect to JSON
        return response()->json([
            'message' => 'Job alert updated successfully.',
            'jobAlert' => $jobAlert
        ]);
    }

    /**
     * Remove the specified job alert from storage.
     */
    public function destroy(JobAlert $jobAlert)
    {
        $this->authorize('delete', $jobAlert);

        $jobAlert->delete();

        // Converted from redirect to JSON
        return response()->json(['message' => 'Job alert deleted successfully.']);
    }
}