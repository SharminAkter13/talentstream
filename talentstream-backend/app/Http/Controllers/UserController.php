<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // No middleware needed here if the routes are wrapped in API middleware group
    }

    
    public function index()
    {
        $users = User::with('role')->get();
        return response()->json($users); 
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6',
            'role_id'   => 'required|exists:roles,id',
        ]);

        $selectedRole = Role::findOrFail($request->role_id);
        $currentUser = $request->user();

        // Prevent non-admin users from creating admin accounts (assuming role ID 1 is Admin)
        if ($currentUser && optional($currentUser->role)->id !== 1 && $selectedRole->id === 1) { 
            return response()->json(['error' => 'Unauthorized to create admin accounts.'], 403);
        }

        // FIX: Set status to 'active' if the role is Admin (ID 1), otherwise 'pending'
        $initialStatus = ($selectedRole->id === 1) ? 'active' : 'pending';

        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role_id'   => $request->role_id,
            'status'    => $initialStatus, // Use the dynamically determined status
        ]);

        // If the user is active immediately (e.g., an Admin), create their profile now
        if ($initialStatus === 'active') {
            $this->createRoleProfile($user);
        }

        return response()->json([
            'message' => 'User created successfully.' . ($initialStatus === 'pending' ? ' Awaiting admin approval.' : ''), 
            'user' => $user->load('role')
        ], 201);
    }
    
    public function create()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

 
    public function edit(User $user)
    {
        $roles = Role::all();        
        return response()->json([
            'user' => $user->load('role'),
            'roles' => $roles
        ]); 
    }

 
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email,' . $user->id,
            'password'  => 'nullable|string|min:6',
            'role_id'   => 'required|exists:roles,id',
            'status'    => 'required|in:active,pending,banned', 
        ]);

        $newRole = Role::findOrFail($request->role_id);
        $currentUser = $request->user();

        // Prevent non-admin users from assigning the admin role
        if (optional($currentUser->role)->id !== 1 && $newRole->id === 1) {
            return response()->json(['error' => 'Unauthorized to assign the admin role.'], 403);
        }

        // Prevent an admin from revoking their own admin role
        if ($currentUser->id === $user->id && $newRole->id !== 1) {
             return response()->json(['error' => 'You cannot revoke your own admin role.'], 403);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role_id;
        $user->status = $request->status; 

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully.', 
            'user' => $user->load('role')
        ]);
    }

    
    public function destroy(Request $request, User $user) 
    {
        if ($request->user()->id === $user->id) {
            return response()->json(['error' => 'You cannot delete your own account.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }

    
    public function approve(User $user)
    {
        if ($user->status === 'active') {
            return response()->json(['message' => 'User already approved.']);
        }

        $user->status = 'active';
        $user->save();

        // Create the role profile when the user is approved
        $this->createRoleProfile($user);

        return response()->json([
            'message' => 'User approved successfully!',
            'user' => $user->load('role')
        ]);
    }


    private function createRoleProfile(User $user)
    {
        if ($user->role->name === 'candidate' && !$user->candidate) {
            $user->candidate()->create([
                'user_id' => $user->id,
                'name'    => $user->name,
                'resume'  => null,
                'phone'   => null,
                'address' => null,
            ]);
        } elseif ($user->role->name === 'employer' && !$user->employer) {
            $user->employer()->create([
                'user_id'      => $user->id,
                'name'         => $user->name,
                'company_id'   => null,
                'website'      => null,
                'phone'        => null,
                'address'      => null,
            ]);
        }
    }
}