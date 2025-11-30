<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');
        if (!$header) {
            return response()->json(['message' => 'Unauthorized - missing header'], 401);
        }

        // Accept "Bearer <token>" or direct token
        if (str_starts_with($header, 'Bearer ')) {
            $token = substr($header, 7);
        } else {
            $token = $header;
        }

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid Token'], 401);
        }

        auth()->login($user);

        return $next($request);
    }
}
