<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ResumeController extends Controller
{
    /**
     * Get the single resume for the logged-in candidate
     */
    public function index()
    {
        $user = Auth::user();
        
        // Find candidate first
        $candidate = Candidate::where('user_id', $user->id)->first();

        if (!$candidate) {
            return response()->json(['status' => false, 'message' => 'Candidate not found'], 404);
        }

        // Return the single resume (using first() because it is 1-to-1)
        $resume = Resume::where('candidate_id', $candidate->id)
            ->with(['educations', 'experiences', 'skills'])
            ->first();

        return response()->json([
            'status' => true,
            'data' => $resume
        ]);
    }

    /**
     * Store the candidate resume
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $candidate = Candidate::where('user_id', $user->id)->first();

        if (!$candidate) {
            return response()->json(['message' => 'Not an authorized candidate'], 403);
        }

        // Enforce one-to-one at application level
        if (Resume::where('candidate_id', $candidate->id)->exists()) {
            return response()->json(['message' => 'Resume already exists. Please update it instead.'], 400);
        }

        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'profession_title' => 'required|string|max:255',
            'location'         => 'nullable|string',
            'web'              => 'nullable|string',
            'pre_hour'         => 'nullable|string',
            'age'              => 'nullable|integer',
            'cover_image'      => 'nullable|image|max:2048',
        ]);

        return DB::transaction(function () use ($request, $candidate, $validated) {
            // Handle File Upload
            $imagePath = null;
            if ($request->hasFile('cover_image')) {
                $imagePath = $request->file('cover_image')->store('resumes', 'public');
            }

            // 1. Create Resume tied to candidate_id
            $resume = Resume::create([
                'candidate_id'     => $candidate->id,
                'name'             => $validated['name'],
                'email'            => $validated['email'],
                'profession_title' => $validated['profession_title'],
                'location'         => $validated['location'],
                'web'              => $validated['web'],
                'pre_hour'         => $validated['pre_hour'],
                'age'              => $validated['age'],
                'cover_image'      => $imagePath,
            ]);

            // 2. Save Education
            if ($request->educations) {
                foreach ($request->educations as $edu) {
                    $resume->educations()->create([
                        'degree'          => $edu['degree'] ?? '',
                        'field_of_study'  => $edu['field_of_study'] ?? '',
                        'school'          => $edu['school'] ?? '',
                        'edu_from'        => $edu['edu_from'] ?? null,
                        'edu_to'          => $edu['edu_to'] ?? null,
                        'edu_description' => $edu['edu_description'] ?? null,
                    ]);
                }
            }

            // 3. Save Experience
            if ($request->experiences) {
                foreach ($request->experiences as $exp) {
                    $resume->experiences()->create([
                        'company_name'    => $exp['company_name'] ?? '',
                        'title'           => $exp['title'] ?? '',
                        'exp_from'        => $exp['exp_from'] ?? null,
                        'exp_to'          => $exp['exp_to'] ?? null,
                        'exp_description' => $exp['exp_description'] ?? null,
                    ]);
                }
            }

            // 4. Save Skills
            if ($request->skills) {
                foreach ($request->skills as $skill) {
                    $resume->skills()->create([
                        'skill_name'    => $skill['skill_name'] ?? '',
                        'skill_percent' => $skill['skill_percent'] ?? 0,
                    ]);
                }
            }

            return response()->json(['status' => true, 'message' => 'Resume created successfully']);
        });
    }

    /**
     * Show a single resume details
     */
    public function show($id)
    {
        $resume = Resume::with(['educations', 'experiences', 'skills'])->findOrFail($id);
        return response()->json($resume);
    }

    /**
     * Update existing resume
     */
    public function update(Request $request, $id)
    {
        $resume = Resume::findOrFail($id);
        
        // Update main data
        $resume->update($request->only([
            'name', 'email', 'profession_title', 'location', 'web', 'pre_hour', 'age'
        ]));

        // Handle image update
        if ($request->hasFile('cover_image')) {
            if ($resume->cover_image) Storage::disk('public')->delete($resume->cover_image);
            $resume->cover_image = $request->file('cover_image')->store('resumes', 'public');
            $resume->save();
        }

        // Refresh child tables (Delete existing and re-insert)
        $resume->educations()->delete();
        $resume->experiences()->delete();
        $resume->skills()->delete();

        if ($request->educations) {
            foreach ($request->educations as $edu) {
                $resume->educations()->create($edu);
            }
        }
        
        if ($request->experiences) {
            foreach ($request->experiences as $exp) {
                $resume->experiences()->create($exp);
            }
        }

        if ($request->skills) {
            foreach ($request->skills as $skill) {
                $resume->skills()->create($skill);
            }
        }

        return response()->json(['status' => true, 'message' => 'Resume updated successfully']);
    }

    /**
     * Delete resume
     */
    public function destroy($id)
    {
        $resume = Resume::findOrFail($id);
        
        if ($resume->cover_image) {
            Storage::disk('public')->delete($resume->cover_image);
        }

        // Nested data will be deleted if you have 'cascade' in migrations, 
        // otherwise, we do it manually here:
        $resume->educations()->delete();
        $resume->experiences()->delete();
        $resume->skills()->delete();
        $resume->delete();

        return response()->json(['status' => true, 'message' => 'Resume deleted']);
    }
}