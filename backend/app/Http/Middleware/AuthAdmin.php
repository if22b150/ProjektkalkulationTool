<?php

namespace App\Http\Middleware;

use App\Enums\ERole;
use Closure;
use Illuminate\Http\Request;

class AuthAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $user = $request->user();

        // Only admins are allowed to access these routes
        if ($user->role != ERole::ADMIN)
            return response(null, 404);

        return $next($request);
    }
}
