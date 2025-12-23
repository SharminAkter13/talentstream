<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class UserController extends BaseController
{
    use AuthorizesRequests;

    public function index()
    {
        $users = User::with('role')->get();
        return response()->json($users); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id'  => 'required|exists:roles,id',
        ]);

        // FIX: Accessing the user via the Request object (set by your ApiAuth middleware)
        /** @var User $currentUser */
        $currentUser = $request->user(); 
        
        if ($request->role_id == 1 && $currentUser->role_id != 1) {
            return response()->json(['error' => 'Unauthorized to create admin accounts.'], 403);
        }

        return DB::transaction(function () use ($request) {
            $initialStatus = ($request->role_id == 1) ? 'active' : 'pending';

            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'role_id'  => $request->role_id,
                'status'   => $initialStatus,
            ]);

            if ($initialStatus === 'active') {
                $this->createRoleProfile($user);
            }

            return response()->json([
                'message' => 'User created successfully.' . ($initialStatus === 'pending' ? ' Awaiting approval.' : ''), 
                'user' => $user->load('role')
            ], 201);
        });
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role_id'  => 'required|exists:roles,id',
            'status'   => 'required|in:active,pending,banned', 
        ]);

        /** @var User $currentUser */
        $currentUser = $request->user();

        if ($request->role_id == 1 && $currentUser->role_id != 1) {
            return response()->json(['error' => 'Unauthorized to assign admin role.'], 403);
        }

        if ($currentUser->id === $user->id && ($request->status !== 'active' || $request->role_id != 1)) {
            return response()->json(['error' => 'You cannot demote or ban your own admin account.'], 403);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role_id;
        $user->status = $request->status; 

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'User updated successfully.', 'user' => $user->load('role')]);
    }

    public function destroy(Request $request, User $user) 
    {
        /** @var User $currentUser */
        $currentUser = $request->user();

        if ($currentUser->id === $user->id) {
            return response()->json(['error' => 'Self-deletion is not allowed.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully.']);
    }

    public function approve(User $user)
    {
        if ($user->status === 'active') {
            return response()->json(['message' => 'User is already active.'], 400);
        }

        return DB::transaction(function () use ($user) {
            $user->status = 'active';
            $user->save();

            $this->createRoleProfile($user);

            return response()->json([
                'message' => 'User approved and profile created.',
                'user' => $user->load('role')
            ]);
        });
    }

    private function createRoleProfile(User $user)
    {
        $roleName = strtolower($user->role->name);

        if ($roleName === 'candidate' && !$user->candidate) {
            $user->candidate()->create(['name' => $user->name]);
        } elseif ($roleName === 'employer' && !$user->employer) {
            $user->employer()->create(['name' => $user->name]);
        }
    }
}