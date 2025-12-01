<?php

namespace App\Http\Controllers;

use App\Models\JobAlert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PortalJobAlertsController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // This controller is only for authenticated users (candidates)
        $this->middleware('auth:web');
    }

    /**
     * Display all job alerts for the logged-in user.
     */
    public function index()
    {
        // It's good practice to use gates/policies for authorization check
        // $this->authorize('viewAny', JobAlert::class);

        $jobAlerts = JobAlert::where('user_id', Auth::id())
            ->latest()
            ->get();

        return view('portal_pages.candidates.job_alerts', compact('jobAlerts'));
    }

    /**
     * Store a newly created job alert based on search criteria.
     */
    public function store(Request $request)
    {
        // $this->authorize('create', JobAlert::class);

        $request->validate([
            // Must provide at least one search criterion
            'keyword' => 'required_without_all:category_id,job_type_id,job_location_id|nullable|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'job_type_id' => 'nullable|exists:job_types,id',
            'job_location_id' => 'nullable|exists:job_locations,id',
            'frequency' => 'nullable|in:daily,weekly,monthly',
        ], [
            'required_without_all' => 'Please select or enter at least one criteria (Keyword, Category, Job Type, or Location) to create a job alert.',
        ]);

        JobAlert::create([
            'user_id' => Auth::id(),
            'keyword' => $request->keyword,
            'category_id' => $request->category_id,
            'job_type_id' => $request->job_type_id,
            'job_location_id' => $request->job_location_id,
            'frequency' => $request->input('frequency', 'daily'), // Default to daily
            'status' => 'active',
        ]);

        return redirect()->back()->with('success', 'Job alert created successfully! You will receive updates based on your criteria.');
    }

    /**
     * Remove the specified job alert from storage.
     */
    public function destroy(JobAlert $jobAlert)
    {
        // $this->authorize('delete', $jobAlert);

        // Ensure the job alert belongs to the current user before deleting
        if ($jobAlert->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $jobAlert->delete();

        return redirect()->back()->with('success', 'Job alert deleted successfully.');
    }
}