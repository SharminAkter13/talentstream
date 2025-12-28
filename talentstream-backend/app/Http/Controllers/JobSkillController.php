<?php

namespace App\Http\Controllers;

use App\Models\JobSkill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller as BaseController;

class JobSkillController extends BaseController
{
    public function index()
    {
        // Return all skills for the management list
        $skills = JobSkill::latest()->get();
        return response()->json(['skills' => $skills]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'   => 'required|string|max:255|unique:job_skills,name',
            'amount' => 'nullable|integer|min:0',
            'price'  => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $skill = JobSkill::create($request->only(['name', 'amount', 'price']));

        return response()->json([
            'message' => 'Skill created successfully',
            'skill' => $skill
        ], 201);
    }

    public function destroy($id)
    {
        $skill = JobSkill::findOrFail($id);
        $skill->delete();
        return response()->json(['message' => 'Skill deleted successfully']);
    }
}