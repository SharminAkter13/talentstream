<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // Apply middleware to restrict access to authenticated admin users
        // Note: 'store' and 'create' are excluded if they are used for public registration
        $this->middleware('auth:web')->except(['create', 'store']);
        $this->middleware('can:isAdmin')->except(['create', 'store']);
    }

    /**
     * List all users
     */
    public function index()
    {
        $users = User::with('role')->get();
        return view('pages.users.index', compact('users'));
    }

    /**
     * Show create form
     */
    public function create()
    {
        // This is typically open for public registration or requires specific admin privilege
        $roles = Role::all();
        return view('pages.users.create', compact('roles'));
    }

    /**
     * Store new user
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6',
            'role_id'   => 'required|exists:roles,id',
        ]);

        $selectedRole = Role::findOrFail($request->role_id);

        // Security Check: Only admin can create other admin users
        if (Auth::check() && Auth::user()->role->name !== 'admin' && $selectedRole->name === 'admin') {
            return back()->with('error', 'Unauthorized to create admin accounts.')->withInput();
        }

        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role_id'   => $request->role_id,
            'status'    => 'pending', // default status before admin approval
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully. Awaiting admin approval.');
    }

    /**
     * Show edit form
     */
    public function edit(User $user)
    {
        $roles = Role::all();
        return view('pages.users.edit', compact('user', 'roles'));
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email,' . $user->id,
            'password'  => 'nullable|string|min:6',
            'role_id'   => 'required|exists:roles,id',
        ]);

        $newRole = Role::findOrFail($request->role_id);
        $currentUser = Auth::user();

        // Security Check 1: Prevent non-admins from promoting to admin
        if ($currentUser->role->name !== 'admin' && $newRole->name === 'admin') {
            return back()->with('error', 'Unauthorized to assign the admin role.');
        }

        // Security Check 2: Prevent the admin from revoking their own admin role
        if ($currentUser->id === $user->id && $newRole->name !== 'admin') {
             return back()->with('error', 'You cannot revoke your own admin role.');
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role_id;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Delete user
     */
    public function destroy(User $user)
    {
        // Prevent admin from deleting their own account
        if (Auth::id() === $user->id) {
            return redirect()->route('users.index')->with('error', 'You cannot delete your own account.');
        }

        // This should cascade delete related candidate/employer records if set up in models
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    /**
     * Approve user (admin action)
     */
    public function approve(User $user)
    {
        if ($user->status === 'active') {
            return redirect()->back()->with('success', 'User already approved.');
        }

        $user->status = 'active';
        $user->save();

        // Create related role profile if missing
        $this->createRoleProfile($user);

        return redirect()->back()->with('success', 'User approved successfully!');
    }

    /**
     * Helper function to create candidate/employer profile
     * This is crucial for linking the user account to its specific profile table.
     */
    private function createRoleProfile(User $user)
    {
        if ($user->role->name === 'candidate' && !$user->candidate) {
            $user->candidate()->create([
                'user_id' => $user->id, // Ensure user_id is explicitly passed if not auto-filled by relationship
                'name'    => $user->name,
                'resume'  => null,
                'phone'   => null,
                'address' => null,
            ]);
        } elseif ($user->role->name === 'employer' && !$user->employer) {
            $user->employer()->create([
                'user_id'      => $user->id, // Ensure user_id is explicitly passed if not auto-filled by relationship
                'name'         => $user->name,
                // Note: company_id is nullable here, as it might be set later by the admin
                'company_id'   => null,
                'website'      => null,
                'phone'        => null,
                'address'      => null,
            ]);
        }
    }
}