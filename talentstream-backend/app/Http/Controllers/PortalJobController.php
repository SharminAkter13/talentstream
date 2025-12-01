<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Company;
use App\Models\Employer;
use App\Models\JobLocation;
use App\Models\JobType;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class PortalJobController extends Controller
{
    // Show jobs posted by employer
    public function index()
    {
        $jobs = Job::where('employer_id', Auth::id())
            ->latest()
            ->paginate(10);

        return view('portal_pages.employers.manage_job', compact('jobs'));
    }

    // Show form with company info + dropdown lists
    public function create()
    {
        $user = Auth::user();

        // Employer record
        $employer = Employer::where('user_id', $user->id)->first();

        // Company record
        $company = $employer ? Company::find($employer->company_id) : null;

        // Required dropdown data
        $jobLocations = JobLocation::all();
        $jobTypes     = JobType::all();
        $categories   = Category::all();

        return view(
            'portal_pages.employers.add_job',
            compact('company', 'user', 'employer', 'jobLocations', 'jobTypes', 'categories')
        );
    }

    // Store job
    public function store(Request $request)
    {
        $request->validate([
            'title'             => 'required|string|max:255',
            'job_location_id'   => 'required|integer',
            'job_type_id'       => 'required|integer',
            'category_id'       => 'required|integer',
            'description'       => 'required|string',
            'application_email' => 'required|email',
            'closing_date'      => 'nullable|date',
            'company_name'      => 'required|string|max:255',
            'website'           => 'nullable|url',
            'cover_img_file'    => 'nullable|image|max:2048',
        ]);

        $job = new Job();
        $job->user_email        = Auth::user()->email;
        $job->employer_id       = Auth::id();
        $job->title             = $request->title;
        $job->job_location_id   = $request->job_location_id;
        $job->job_type_id       = $request->job_type_id;
        $job->category_id       = $request->category_id;
        $job->tags              = $request->tags;
        $job->description       = $request->description;
        $job->application_email = $request->application_email;
        $job->application_url   = $request->application_url;
        $job->closing_date      = $request->closing_date;
        $job->company_name      = $request->company_name;
        $job->website           = $request->website;

        // Upload cover if exists
        if ($request->hasFile('cover_img_file')) {
            $file = $request->file('cover_img_file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/job_covers'), $filename);
            $job->cover_image = $filename;
        }

        $job->save();

        return redirect()->route('portal.job.create')
            ->with('success', 'Job posted successfully!');
    }
}