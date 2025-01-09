<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Check if the user is authenticated using Sanctum
        if (!Auth::guard('sanctum')->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Get the authenticated user
        $user = Auth::guard('sanctum')->user();

        if (!$user->roles->contains('name', $role)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    } 
}
