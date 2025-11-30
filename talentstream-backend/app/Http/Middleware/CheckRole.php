<?php

// app/Http/Middleware/CheckRole.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    // Usage: ->middleware('role:1,2') or ->middleware('role:admin,employer') if you map names
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // roles could be numeric ids or names; support both
        foreach ($roles as $role) {
            if (is_numeric($role) && $user->role_id == (int)$role) {
                return $next($request);
            }
            if (!is_numeric($role) && optional($user->role)->name === $role) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Forbidden - insufficient role'], 403);
    }
}
