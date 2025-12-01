<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class ApiAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');

        if (!$header) {
            return response()->json(['message' => 'Unauthorized - missing Authorization header'], 401);
        }

        // Format: Bearer <token>
        $token = str_starts_with($header, 'Bearer ')
            ? substr($header, 7)
            : $header;

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid or expired token'], 401);
        }

        // For API: do NOT use auth()->login()
        auth()->setUser($user);

        return $next($request);
    }
}
