<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

// Assuming you have these Eloquent Models defined:
use App\Models\Job;
use App\Models\Application;
use App\Models\User;
use App\Models\Company;
// Note: Skills are typically attached to a Resume (resumes -> skills)

class AdminDashboardController extends Controller
{
    public function index()
    {
        // For type hinting the Auth::user() call for IDE/Linter (resolves previous error)
        /** @var \App\Models\User $user */
        $user = Auth::user(); 

        // 1. Fetch Key Metrics
        $total_jobs = Job::count();
        $total_applications = Application::count();
        // Assuming role_id 3 is 'Candidate' based on the roles table dump.
        $total_candidates = User::where('role_id', 3)->count();
        $total_companies = Company::count();

        // 2. Data for Bar Chart: Applications Per Month (Last 6 Months)
        $monthly_applications = DB::table('applications')
            ->select(
                DB::raw('MONTH(applied_date) as month'),
                DB::raw('COUNT(*) as count')
            )
            // Filter for the last 6 months worth of data
            ->where('applied_date', '>=', Carbon::now()->subMonths(5)->startOfMonth())
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $applications_per_month = [
            'labels' => [],
            'data' => [],
        ];

        // Format the monthly data for the chart (ensuring labels are month names)
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $count = $monthly_applications->firstWhere('month', $month->month)?->count ?? 0;
            
            $applications_per_month['labels'][] = $month->format('M'); // e.g., 'Jul'
            $applications_per_month['data'][] = $count;
        }

        // 3. Data for Pie Chart: Top Candidate Skills (Top 4 Skills)
        $top_skills = DB::table('skills')
            ->select('skill_name', DB::raw('COUNT(skill_name) as count'))
            ->groupBy('skill_name')
            ->orderByDesc('count')
            ->limit(4)
            ->get();
        
        $top_candidate_skills = [
            'labels' => $top_skills->pluck('skill_name')->toArray(),
            'data' => $top_skills->pluck('count')->toArray(),
            // Provide a static list of colors (must match the length of data or be cyclable)
            'colors' => ["#4287f5", "#f54242", "#42f56f", "#f5e942"], 
        ];


        // 4. Data for Line Chart: Job Postings Trend (Last 6 Weeks)
        // Grouping by week is more complex in DB, so we'll use a simpler weekly aggregation.
        $weekly_jobs = DB::table('jobs')
            ->select(
                DB::raw('WEEK(posted_date) as week'),
                DB::raw('COUNT(*) as count')
            )
            ->where('posted_date', '>=', Carbon::now()->subWeeks(5))
            ->groupBy('week')
            ->orderBy('week')
            ->get();
        
        $job_postings_trend = [
            'labels' => $weekly_jobs->pluck('week')->map(fn($w) => "W{$w}")->toArray(), // e.g., ['W45', 'W46', ...]
            'data' => $weekly_jobs->pluck('count')->toArray(),
        ];
        // NOTE: For accurate weekly data, you might need a more complex query to fill in weeks with 0 posts.

return response()->json([
    'message' => 'Admin Dashboard Data Fetched Successfully',
    'metrics' => [
        'total_jobs' => $total_jobs,
        'total_applications' => $total_applications,
        'total_candidates' => $total_candidates,
        'total_companies' => $total_companies,
    ],
    'charts' => [
        'barChart' => [
            // Use the formatted array you built in the for-loop
            'labels' => $applications_per_month['labels'], 
            'data'   => $applications_per_month['data']
        ],
        'pieChart' => [
            // Use the pluck results from your $top_skills query
            'labels' => $top_candidate_skills['labels'],
            'data'   => $top_candidate_skills['data'],
            'colors' => $top_candidate_skills['colors']
        ],
        'lineChart' => [
            // Use the map/pluck results from your $weekly_jobs query
            'labels' => $job_postings_trend['labels'],
            'data'   => $job_postings_trend['data']
        ]
    ]
]);    }
}