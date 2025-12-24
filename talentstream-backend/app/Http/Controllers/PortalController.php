<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Category;
use App\Models\Company;
use App\Models\Package;
use App\Models\Employer;
use App\Models\Resume;
use App\Models\User;
use Illuminate\Routing\Controller as BaseController; // Use BaseController
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PortalController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // No authentication middleware is needed for public portal pages
    }

    /**
     * Display the main portal homepage.
     */
    public function index()
    {
        // Load latest and featured jobs
        $hotJobs = Job::with('category')->where('status', 'active')->latest()->take(5)->get();
        $featuredJobs = Job::with('employer.company') // Load company info for featured jobs
            ->where('status', 'active')
            ->latest()
            ->take(6)
            ->get();

        // Load categories (only active ones if you have an 'is_active' column)
        $categories = Category::where('is_active', true)->get();

        // Load pricing packages
        $packages = Package::orderBy('price', 'asc')->get();

        // Load employers/companies as clients for the homepage banner
        $clients = Company::latest()->take(6)->get();

        // Load dashboard counters
        $counters = [
            'jobs' => Job::where('status', 'active')->count(),
            'members' => User::where('role_id', '!=', 1)->count(), // Exclude Admins
            'resumes' => Resume::count(),
            'companies' => Company::count(),
        ];

        return view('portal_pages.home', compact('hotJobs', 'featuredJobs', 'categories', 'packages', 'clients', 'counters'));
    }

    /**
     * Display a generic detail page (e.g., for 'About Us' or 'Contact').
     * Note: This assumes dynamic content routing, but can be used for simple views.
     */
    public function show($slug)
    {
        // This method can be used to load static portal pages based on slug
        $viewName = 'portal_pages.' . $slug;

        if (view()->exists($viewName)) {
            return view($viewName);
        }

        abort(404);
    }
    
}