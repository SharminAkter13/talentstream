<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Job;
use App\Models\JobLocation;

class PortalController extends Controller
{
    /**
     * Fetch active categories, latest active jobs, and locations in one call.
     */
    public function index()
    {
        // 1. Fetch active categories with active jobs count
        $categories = Category::where('is_active', true)
            ->withCount(['jobs' => function($query) {
                $query->where('status', 'active');
            }])
            ->orderBy('sort_order', 'asc')
            ->get();

        // 2. Fetch latest 10 active jobs
        $jobs = Job::where('status', 'active')
            ->with(['jobLocation', 'jobType', 'employer.company'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company_name' => $job->employer->company->name ?? 'Company',
                    'company_logo' => $job->employer->company->logo ?? null,
                    'location' => $job->jobLocation->name ?? 'Remote',
                    'type' => $job->jobType->name ?? 'Full Time',
                ];
            });

        // 3. Fetch all locations for the Hero Section dropdown
        $locations = JobLocation::all();

        return response()->json([
            'success' => true,
            'categories' => $categories,
            'jobs' => $jobs,
            'locations' => $locations
        ]);
    }
}