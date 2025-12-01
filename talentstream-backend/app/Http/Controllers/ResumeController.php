<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ResumeController extends BaseController
{
    use AuthorizesRequests;

    /**
     * Show all resumes
     */
    public function index()
    {
        $resumes = Resume::with(['educations', 'experiences', 'skills'])->get();
        return view('pages.resumes.resume', compact('resumes'));
    }

    /**
     * Show create form
     */
    public function create()
    {
        return view('pages.resumes.create-resume');
    }

    /**
     * Store resume + related data
     */
    public function store(Request $request)
    {
        // Add validation for nested file uploads (edu_logo and exp_logo)
        $data = $request->validate([
            'name'                   => 'required|string|max:255',
            'email'                  => 'required|email',
            'profession_title'       => 'nullable|string|max:255',
            'location'               => 'nullable|string|max:255',
            'web'                    => 'nullable|string|max:255',
            'pre_hour'               => 'nullable|string|max:255',
            'age'                    => 'nullable|integer',
            'cover_image'            => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

            // Nested validation for logos
            'educations.*.degree'           => 'nullable|string|max:255',
            'educations.*.edu_logo'         => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
            'experiences.*.company_name'    => 'nullable|string|max:255',
            'experiences.*.exp_logo'        => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
            'skills.*.skill_name'           => 'nullable|string|max:255',
            'skills.*.skill_percent'        => 'nullable|integer|min:0|max:100',
        ]);

        // Upload cover image
        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        // Create Resume
        $resume = Resume::create($data);

        // Education entries
        if ($request->has('educations')) {
            foreach ($request->educations as $edu) {
                if (empty($edu['degree'])) continue; // Skip empty entries

                $eduData = [
                    'resume_id'       => $resume->id,
                    'degree'          => $edu['degree'] ?? null,
                    'field_of_study'  => $edu['field_of_study'] ?? null,
                    'school'          => $edu['school'] ?? null,
                    'edu_from'        => $edu['edu_from'] ?? null,
                    'edu_to'          => $edu['edu_to'] ?? null,
                    'edu_description' => $edu['edu_description'] ?? null,
                ];

                // Handle logo upload for each education entry
                if (isset($edu['edu_logo']) && $edu['edu_logo'] instanceof \Illuminate\Http\UploadedFile) {
                    $eduData['edu_logo'] = $edu['edu_logo']->store('edu_logos', 'public');
                }

                Education::create($eduData);
            }
        }

        // Experience entries
        if ($request->has('experiences')) {
            foreach ($request->experiences as $exp) {
                if (empty($exp['company_name'])) continue; // Skip empty entries

                $expData = [
                    'resume_id'       => $resume->id,
                    'company_name'    => $exp['company_name'] ?? null,
                    'title'           => $exp['title'] ?? null,
                    'exp_from'        => $exp['exp_from'] ?? null,
                    'exp_to'          => $exp['exp_to'] ?? null,
                    'exp_description' => $exp['exp_description'] ?? null,
                ];

                // Handle logo upload for each experience entry
                if (isset($exp['exp_logo']) && $exp['exp_logo'] instanceof \Illuminate\Http\UploadedFile) {
                    $expData['exp_logo'] = $exp['exp_logo']->store('exp_logos', 'public');
                }

                Experience::create($expData);
            }
        }

        // Skills entries
        if ($request->has('skills')) {
            foreach ($request->skills as $skill) {
                if (empty($skill['skill_name'])) continue; // Skip empty entries

                Skill::create([
                    'resume_id'       => $resume->id,
                    'skill_name'      => $skill['skill_name'] ?? null,
                    'skill_percent'   => $skill['skill_percent'] ?? null,
                ]);
            }
        }

        return redirect()->route('resumes.index')->with('success', 'Resume created successfully!');
    }

    /**
     * Show a single resume
     */
    public function show(Resume $resume) // Using Route Model Binding
    {
        $resume->load(['educations', 'experiences', 'skills']);
        return view('pages.resumes.show-resume', compact('resume'));
    }

    /**
     * Edit form
     */
    public function edit(Resume $resume) // Using Route Model Binding
    {
        $resume->load(['educations', 'experiences', 'skills']);
        return view('pages.resumes.edit-resume', compact('resume'));
    }

    /**
     * Update resume + relations
     */
    public function update(Request $request, Resume $resume) // Using Route Model Binding
    {
        // Define validation rules for main resume and nested dynamic data (including files)
        $validated = $request->validate([
            'name'                   => 'required|string|max:100',
            'email'                  => 'required|email|max:100',
            'profession_title'       => 'nullable|string|max:150',
            'location'               => 'nullable|string|max:150',
            'web'                    => 'nullable|string|max:150',
            'pre_hour'               => 'nullable|string|max:50',
            'age'                    => 'nullable|integer',
            // Allow for `null` if the image is being kept (not uploaded)
            'cover_image'            => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

            // Nested validation for logos (if updating, these are new files)
            'educations.*.id'               => 'nullable|integer|exists:educations,id',
            'educations.*.degree'           => 'nullable|string|max:255',
            'educations.*.edu_logo'         => 'nullable|image|mimes:jpg,jpeg,png|max:1024',

            'experiences.*.id'              => 'nullable|integer|exists:experiences,id',
            'experiences.*.company_name'    => 'nullable|string|max:255',
            'experiences.*.exp_logo'        => 'nullable|image|mimes:jpg,jpeg,png|max:1024',

            'skills.*.id'                   => 'nullable|integer|exists:skills,id',
            'skills.*.skill_name'           => 'nullable|string|max:255',
            'skills.*.skill_percent'        => 'nullable|integer|min:0|max:100',
        ]);

        // --- Handle Main Image Update ---
        if ($request->hasFile('cover_image')) {
            // Delete old image if it exists
            if ($resume->cover_image && Storage::disk('public')->exists($resume->cover_image)) {
                Storage::disk('public')->delete($resume->cover_image);
            }
            $path = $request->file('cover_image')->store('resumes', 'public');
            $validated['cover_image'] = $path;
        } else {
             // Ensure cover_image is not null if it was previously set and not changed
             unset($validated['cover_image']);
        }

        $resume->update($validated);

        // --- Update Related Data (Sync/Replace Strategy) ---
        // For simplicity, we'll continue with the delete-and-recreate strategy,
        // but now we handle logo deletion before deletion of the records.

        // Collect old logos to delete
        $oldLogos = [];
        $resume->educations->each(fn($e) => $oldLogos[] = $e->edu_logo);
        $resume->experiences->each(fn($e) => $oldLogos[] = $e->exp_logo);

        // Delete old records
        $resume->educations()->delete();
        $resume->experiences()->delete();
        $resume->skills()->delete();

        // Delete old logo files
        foreach ($oldLogos as $logoPath) {
            if ($logoPath && Storage::disk('public')->exists($logoPath)) {
                Storage::disk('public')->delete($logoPath);
            }
        }


        // Recreate updated relations
        if ($request->has('educations')) {
            foreach ($request->educations as $edu) {
                if (empty($edu['degree'])) continue;

                $eduData = [
                    'degree'          => $edu['degree'] ?? null,
                    'field_of_study'  => $edu['field_of_study'] ?? null,
                    'school'          => $edu['school'] ?? null,
                    'edu_from'        => $edu['edu_from'] ?? null,
                    'edu_to'          => $edu['edu_to'] ?? null,
                    'edu_description' => $edu['edu_description'] ?? null,
                ];

                // Check if a new file was uploaded for this entry
                if (isset($edu['edu_logo']) && $edu['edu_logo'] instanceof \Illuminate\Http\UploadedFile) {
                    $eduData['edu_logo'] = $edu['edu_logo']->store('edu_logos', 'public');
                }
                $resume->educations()->create($eduData);
            }
        }

        if ($request->has('experiences')) {
            foreach ($request->experiences as $exp) {
                if (empty($exp['company_name'])) continue;

                $expData = [
                    'company_name'    => $exp['company_name'] ?? null,
                    'title'           => $exp['title'] ?? null,
                    'exp_from'        => $exp['exp_from'] ?? null,
                    'exp_to'          => $exp['exp_to'] ?? null,
                    'exp_description' => $exp['exp_description'] ?? null,
                ];

                // Check if a new file was uploaded for this entry
                if (isset($exp['exp_logo']) && $exp['exp_logo'] instanceof \Illuminate\Http\UploadedFile) {
                    $expData['exp_logo'] = $exp['exp_logo']->store('exp_logos', 'public');
                }
                $resume->experiences()->create($expData);
            }
        }

        if ($request->has('skills')) {
            foreach ($request->skills as $skill) {
                if (empty($skill['skill_name'])) continue;

                $resume->skills()->create([
                    'skill_name'    => $skill['skill_name'] ?? null,
                    'skill_percent' => $skill['skill_percent'] ?? null,
                ]);
            }
        }

        return Redirect()->route('resumes.index')->with('success', 'Resume updated successfully!');
    }

    /**
     * Delete resume and related data
     */
    public function destroy(Resume $resume) // Using Route Model Binding
    {
        $resume->load(['educations', 'experiences', 'skills']);

        // Delete main image
        if ($resume->cover_image && Storage::disk('public')->exists($resume->cover_image)) {
            Storage::disk('public')->delete($resume->cover_image);
        }

        // Delete associated logo files before records are deleted
        $resume->educations->each(function ($education) {
            if ($education->edu_logo && Storage::disk('public')->exists($education->edu_logo)) {
                Storage::disk('public')->delete($education->edu_logo);
            }
        });
        $resume->experiences->each(function ($experience) {
            if ($experience->exp_logo && Storage::disk('public')->exists($experience->exp_logo)) {
                Storage::disk('public')->delete($experience->exp_logo);
            }
        });

        // Delete records (assuming cascade delete isn't fully set up for files)
        $resume->educations()->delete();
        $resume->experiences()->delete();
        $resume->skills()->delete();
        $resume->delete();

        return Redirect()->route('resumes.index')->with('success', 'Resume deleted successfully.');
    }
}