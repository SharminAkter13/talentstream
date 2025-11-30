<?php

// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email'=> 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed', // use password_confirmation
            'role_id' => 'required|integer|in:1,2,3' // adjust as needed
        ]);

        $token = Str::random(60);

        $user = User::create([
            'name'      => $data['name'],
            'email'     => $data['email'],
            'password'  => Hash::make($data['password']),
            'api_token' => $token,
            'role_id'   => $data['role_id'],
        ]);

        return response()->json([
            'message' => 'Registration Successful',
            'token'   => $token,
            'user'    => $user->only(['id','name','email','role_id'])
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        $token = Str::random(60);
        $user->update(['api_token' => $token]);

        return response()->json([
            'message' => 'Login Successful',
            'token'   => $token,
            'user'    => $user->only(['id','name','email','role_id'])
        ]);
    }

    public function user()
    {
        return response()->json(auth()->user());
    }
}
