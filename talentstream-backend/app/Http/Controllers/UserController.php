<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // List all users
    public function index()
    {
        $users = User::with('role')->get();
        return view('pages.users.index', compact('users'));
    }

    // Show create form
    public function create()
    {
        $roles = Role::all();
        return view('pages.users.create', compact('roles'));
    }

    // Store new user
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id'  => 'required|exists:roles,id',
        ]);

        $selectedRole = Role::findOrFail($request->role_id);

        // Only admin can create other admin users
        if (Auth::check() && Auth::user()->role->name !== 'admin' && $selectedRole->name === 'admin') {
            abort(403, 'Unauthorized to create admin accounts.');
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role_id'  => $request->role_id,
            'status'   => 'pending', // default status before approval
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully. Awaiting admin approval.');
    }

    // Show edit form
    public function edit($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::all();
        return view('pages.users.edit', compact('user', 'roles'));
    }

    // Update user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role_id'  => 'required|exists:roles,id',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role_id;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    // Approve user (admin action)
    public function approve($id)
    {
        $user = User::findOrFail($id);

        if ($user->status === 'active') {
            return redirect()->back()->with('success', 'User already approved.');
        }

        $user->status = 'active';
        $user->save();

        // Create related role profile if missing
        $this->createRoleProfile($user);

        return redirect()->back()->with('success', 'User approved successfully!');
    }

    // Helper function to create candidate/employer profile
    private function createRoleProfile(User $user)
    {
        if ($user->role->name === 'candidate' && !$user->candidate) {
            $user->candidate()->create([
                'name'    => $user->name,
                'resume'  => null,
                'phone'   => null,
                'address' => null,
            ]);
        } elseif ($user->role->name === 'employer' && !$user->employer) {
            $user->employer()->create([
                'name'         => $user->name,
                'company_name' => null,
                'website'      => null,
                'phone'        => null,
                'address'      => null,
            ]);
        }
    }
}