<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Resume, Education, Experience, Skill};
use Illuminate\Support\Facades\Auth;

class ResumePortalController extends Controller
{
    public function create()
    {
        return view('portal_pages.candidates.add_resume');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'profession_title' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'web' => 'nullable|string|max:255',
            'pre_hour' => 'nullable|string|max:255',
            'age' => 'nullable|integer',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data['user_id'] = Auth::id();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        $resume = Resume::create($data);

        // Education
        if ($request->filled('educations')) {
            foreach ($request->educations as $edu) {
                if (!empty($edu['degree'])) {
                    if (isset($edu['edu_logo']) && $edu['edu_logo'] instanceof \Illuminate\Http\UploadedFile) {
                        $edu['edu_logo'] = $edu['edu_logo']->store('edu_logos', 'public');
                    }
                    $resume->educations()->create($edu);
                }
            }
        }

        // Experience
        if ($request->filled('experiences')) {
            foreach ($request->experiences as $exp) {
                if (!empty($exp['company_name'])) {
                    if (isset($exp['exp_logo']) && $exp['exp_logo'] instanceof \Illuminate\Http\UploadedFile) {
                        $exp['exp_logo'] = $exp['exp_logo']->store('exp_logos', 'public');
                    }
                    $resume->experiences()->create($exp);
                }
            }
        }

        // Skills
        if ($request->filled('skills')) {
            foreach ($request->skills as $skill) {
                if (!empty($skill['skill_name'])) {
                    $resume->skills()->create($skill);
                }
            }
        }

        return redirect()->route('resume.create')->with('success', 'Resume has been successfully created.');
    }
}
