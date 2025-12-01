<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Category;
use App\Models\Company;
use App\Models\Package;
use App\Models\Employer;
use App\Models\Resume;
use App\Models\User;

class PortalController extends Controller
{
    public function index()
    {
        // Load latest jobs
        $hotJobs = Job::with('category')->where('status', 'active')->latest()->take(5)->get();

        // Load featured jobs (you can later add an 'is_featured' column)
        $featuredJobs = Job::where('status', 'active')->latest()->take(6)->get();

        // Load categories
        $categories = Category::all();

        // Load pricing packages
        $packages = Package::all();

        // Load employers as clients
        $clients = Employer::latest()->take(6)->get();
         $counters = [
            'jobs' => Job::count(),
            'members' => User::count(),
            'resumes' => Resume::count(),
            'companies' => Company::count(),
        ];


            return view('portal_pages.home', compact('hotJobs', 'featuredJobs', 'categories', 'packages', 'clients', 'counters'));
    }
}