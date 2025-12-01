
<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Job;
use App\Models\JobLocation;
use App\Models\JobType;
use Illuminate\Http\Request;

class BrowseJobController extends Controller
{
   public function index()
    {
        $jobs = Job::with(['category', 'jobType', 'jobLocation'])->latest()->paginate(10); 
        $categories = Category::all();
        $locations = JobLocation::has('jobs')->withCount('jobs')->get();
        $types = JobType::withCount('jobs')->get();

        return view('portal_pages.candidates.browse_jobs', compact('jobs', 'categories', 'locations', 'types'));
    }
}
