<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CandidateController extends Controller
{
    // List all candidates
    public function index()
    {
        $candidates = Candidate::with('user')->get();
        return view('pages.candidates.index', compact('candidates'));
    }

    // Show create form
    public function create()
    {
        return view('pages.candidates.create');
    }

    // Store new candidate (linked to user)
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'resume'   => 'nullable|string',
            'phone'    => 'nullable|string',
            'address'  => 'nullable|string',
        ]);

        $role = Role::where('name', 'candidate')->first();

        // Create user with pending status
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role_id'  => $role->id,
            'status'   => 'pending', // must be approved by admin
        ]);

        // Candidate profile will be created only after admin approval
        return redirect()->route('candidates.index')->with('success', 'Candidate created successfully. Awaiting admin approval.');
    }

    // Edit candidate profile
    public function edit(Candidate $candidate)
    {
        return view('pages.candidates.edit', compact('candidate'));
    }

    // Update candidate and user info
    public function update(Request $request, Candidate $candidate)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'email'  => 'required|email|unique:users,email,'.$candidate->user_id,
            'resume' => 'nullable|string',
            'phone'  => 'nullable|string',
            'address'=> 'nullable|string',
        ]);

        // Update user
        $candidate->user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        // Update candidate profile
        $candidate->update($request->only(['resume','phone','address']));

        return redirect()->route('candidates.index')->with('success', 'Candidate updated successfully!');
    }

    // Delete candidate
    public function destroy(Candidate $candidate)
    {
        $candidate->user()->delete(); // cascade deletes candidate
        return redirect()->route('candidates.index')->with('success', 'Candidate deleted successfully!');
    }
}
