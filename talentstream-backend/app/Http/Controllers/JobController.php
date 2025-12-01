<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Category;
use App\Models\JobLocation;
use App\Models\JobType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    /* ============================
       LIST ALL JOBS (index page)
       ============================ */
public function index()
{
    $user = Auth::user();

    $jobsQuery = Job::with(['category', 'jobLocation', 'jobType', 'employer'])
                    ->orderBy('created_at', 'desc');

    if ($user->role !== 'admin') {
        $employerId = $user->employer ? $user->employer->id : null;

        if ($employerId) {
            $jobsQuery->where('employer_id', $employerId);
        } else {
            // No employer related to user, so no jobs to show
            $jobsQuery->whereRaw('0 = 1'); // always false condition
        }
    }

    $jobs = $jobsQuery->paginate(15);

    return view('pages.jobs.index', compact('jobs'));
}

    /* ============================
       SHOW SINGLE JOB
       ============================ */
    public function show($id)
    {
        $job = Job::with(['category', 'jobLocation', 'jobType'])->findOrFail($id);

        $relatedJobs = Job::with(['category', 'jobLocation'])
            ->where('category_id', $job->category_id)
            ->where('id', '!=', $job->id)
            ->limit(5)
            ->get();

        $featuredJobs = Job::with(['category', 'jobLocation'])
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        $galleryJobs = Job::with(['category', 'jobLocation'])
            ->inRandomOrder()
            ->limit(6)
            ->get();

        return view('pages.jobs.show', compact(
            'job',
            'relatedJobs',
            'featuredJobs',
            'galleryJobs'
        ));
    }

    /* ============================
       CREATE JOB FORM
       ============================ */
    public function create()
    {
        $user =  Auth::user();
        $employer = $user->employer;
        $company = $employer->company ?? null;

        return view('pages.jobs.create', [
            'categories' => Category::all(),
            'locations'  => JobLocation::all(),
            'types'      => JobType::all(),
            'company'    => $company,
        ]);
    }

    /* ============================
       STORE NEW JOB
       ============================ */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'job_location_id' => 'required|integer|exists:job_locations,id',
            'job_type_id' => 'required|integer|exists:job_types,id',
            'description' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $user =  Auth::user();
        $employer = $user->employer;

        if (!$employer) {
            return redirect()->back()->with('error', 'You must have an employer profile before posting a job.');
        }

        $company = $employer->company ?? null;

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/jobs'), $filename);
            $cover_image = 'uploads/jobs/' . $filename;
        } else {
            $cover_image = null;
        }

        Job::create([
            'user_email'        => $user->email,
            'employer_id'       => $employer->id,
            'company_id'        => $company->id ?? null,
            'company_name'      => $company->name ?? $request->company_name,
            'website'           => $company->website ?? $request->website,
            'title'             => $request->title,
            'category_id'       => $request->category_id,
            'job_location_id'   => $request->job_location_id,
            'job_type_id'       => $request->job_type_id,
            'tags'              => $request->tags,
            'description'       => $request->description,
            'application_email' => $request->application_email,
            'application_url'   => $request->application_url,
            'closing_date'      => $request->closing_date,
            'tagline'           => $request->tagline,
            'cover_image'       => $cover_image,
            'status'            => $request->status ?? 'active',
        ]);

        return redirect()->route('jobs.index')->with('success', 'Job added successfully.');
    }

    /* ============================
       EDIT JOB
       ============================ */
    public function edit($id)
    {
        $job = Job::findOrFail($id);
        $user =  Auth::user();
        $company = $user->company ?? null;

        return view('pages.jobs.edit', [
            'job'        => $job,
            'categories' => Category::all(),
            'locations'  => JobLocation::all(),
            'types'      => JobType::all(),
            'company'    => $company,
        ]);
    }

    /* ============================
       UPDATE JOB
       ============================ */
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'job_location_id' => 'required|integer|exists:job_locations,id',
            'job_type_id' => 'required|integer|exists:job_types,id',
            'description' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $user =  Auth::user();
        $company = $user->company ?? null;

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/jobs'), $filename);
            $cover_image = 'uploads/jobs/' . $filename;
        } else {
            $cover_image = $job->cover_image; // keep existing
        }

        $job->update([
            'title'             => $request->title,
            'category_id'       => $request->category_id,
            'job_location_id'   => $request->job_location_id,
            'job_type_id'       => $request->job_type_id,
            'tags'              => $request->tags,
            'description'       => $request->description,
            'application_email' => $request->application_email,
            'application_url'   => $request->application_url,
            'closing_date'      => $request->closing_date,
            'tagline'           => $request->tagline,
            'cover_image'       => $cover_image,
            'status'            => $request->status ?? 'active',
            'company_name'      => $company->name ?? $request->company_name,
            'website'           => $company->website ?? $request->website,
        ]);

        return redirect()->route('jobs.index')->with('success', 'Job updated successfully.');
    }

    /* ============================
       DELETE JOB
       ============================ */
    public function destroy($id)
    {
        Job::findOrFail($id)->delete();
        return redirect()->route('jobs.index')->with('success', 'Job deleted successfully.');
    }
}