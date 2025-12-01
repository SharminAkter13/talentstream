<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Arr; 
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the current authenticated user's profile information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        // Add type hint for better IDE/Linter support
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized or User not found.'], 404);
        }

        // Return user data (excluding sensitive fields like password hash)
        // Fixed previously using Arr::only() on $user->toArray()
        return response()->json([
            'user' => Arr::only($user->toArray(), ['id', 'name', 'email', 'role_id', 'status', 'created_at'])
        ]);
    }

    /**
     * Update the authenticated user's general profile information (Name, Email).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(Request $request)
    {
        // Add type hint for better IDE/Linter support
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Safety check, though authentication middleware should handle this
        if (!$user) {
             return response()->json(['message' => 'Unauthorized.'], 401);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            // Ensure the email is unique, ignoring the current user's ID
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
        ]);

        // This update() call is correct for an Eloquent model. Linter false positive is addressed by PHPDoc.
        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
        ]);

        // Fixed previously using Arr::only() on $user->toArray()
        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => Arr::only($user->toArray(), ['id', 'name', 'email', 'role_id', 'status'])
        ]);
    }

    /**
     * Update the authenticated user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(Request $request)
    {
        // Add type hint for better IDE/Linter support
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        // Safety check, though authentication middleware should handle this
        if (!$user) {
             return response()->json(['message' => 'Unauthorized.'], 401);
        }

        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:6|confirmed', // requires 'password_confirmation' field
        ]);

        // Verify the current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'The provided current password does not match your records.'
            ], 400);
        }

        // This update() call is correct for an Eloquent model. Linter false positive is addressed by PHPDoc.
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Password updated successfully.']);
    }
}