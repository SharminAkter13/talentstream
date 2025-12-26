<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Job;

class PortalController extends Controller
{
    /**
     * Fetch active categories and latest active jobs
     */
    public function index()
    {
        // Fetch active categories with active jobs count
        $categories = Category::where('is_active', true)
            ->withCount(['jobs' => function($query) {
                $query->where('status', 'active');
            }])
            ->orderBy('sort_order', 'asc')
            ->get();

        // Fetch latest 10 active jobs with related data
        $jobs = Job::where('status', 'active')
            ->with(['jobLocation', 'jobType'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company_name' => $job->company_name,
                    'company_logo' => $job->cover_image ?? null, // adjust field if needed
                    'location' => $job->jobLocation->name ?? '',
                    'type' => $job->jobType->name ?? '',
                ];
            });

        return response()->json([
            'success' => true,
            'categories' => $categories,
            'jobs' => $jobs
        ]);
    }
}
