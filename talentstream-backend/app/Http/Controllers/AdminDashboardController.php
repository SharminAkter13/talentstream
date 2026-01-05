<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        /* ---------------- METRICS ---------------- */

        $totalJobs = DB::table('jobs')->count();

        $totalApplications = DB::table('applications')->count();

        $totalCandidates = DB::table('users')
            ->where('role_id', 3)
            ->count();

        $totalCompanies = DB::table('companies')->count();

        /* ---------------- BAR CHART ----------------
           Applications per Job
        */
        $applicationsPerJob = DB::table('applications')
            ->join('jobs', 'applications.job_id', '=', 'jobs.id')
            ->select(
                'jobs.title',
                DB::raw('COUNT(applications.id) as total')
            )
            ->groupBy('jobs.id', 'jobs.title')
            ->get();

        $barChart = [
            'labels' => $applicationsPerJob->pluck('title'),
            'data'   => $applicationsPerJob->pluck('total'),
        ];

        /* ---------------- PIE CHART ----------------
           Jobs per Category
        */
        $jobsByCategory = DB::table('jobs')
            ->join('categories', 'jobs.category_id', '=', 'categories.id')
            ->select(
                'categories.name',
                DB::raw('COUNT(jobs.id) as total')
            )
            ->groupBy('categories.id', 'categories.name')
            ->get();

        $pieChart = [
            'labels' => $jobsByCategory->pluck('name'),
            'data'   => $jobsByCategory->pluck('total'),
            'colors' => ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        ];

        /* ---------------- LINE CHART ----------------
           Jobs posted by date
        */
        $jobsByDate = DB::table('jobs')
            ->select(
                DB::raw('DATE(posted_date) as date'),
                DB::raw('COUNT(id) as total')
            )
            ->groupBy(DB::raw('DATE(posted_date)'))
            ->orderBy('date')
            ->get();

        $lineChart = [
            'labels' => $jobsByDate->pluck('date'),
            'data'   => $jobsByDate->pluck('total'),
        ];

        /* ---------------- RESPONSE ---------------- */

        return response()->json([
            'metrics' => [
                'total_jobs'          => $totalJobs,
                'total_applications' => $totalApplications,
                'total_candidates'   => $totalCandidates,
                'total_companies'    => $totalCompanies,
            ],
            'charts' => [
                'barChart'  => $barChart,
                'pieChart'  => $pieChart,
                'lineChart' => $lineChart,
            ],
        ]);
    }
}
