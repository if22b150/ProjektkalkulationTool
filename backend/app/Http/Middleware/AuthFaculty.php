<?php

namespace App\Http\Middleware;

use App\Enums\ERole;
use Closure;
use Illuminate\Http\Request;

class AuthFaculty
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

        if($user->role == ERole::ADMIN)
            return $next($request);

        // Only admins are allowed to access these routes
        if ($user->faculty->id != $request->route()->facultyId)
            return response(null, 404);

        return $next($request);
    }
}
