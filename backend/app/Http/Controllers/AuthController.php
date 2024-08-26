<?php

namespace App\Http\Controllers;


use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Resources\UserLoginResource;
use App\Http\Resources\UserResource;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\User\ResetPasswordRequest;
use App\Http\Requests\User\SendPasswordResetLinkRequest;


class AuthController extends Controller
{
    public function __construct(protected IUserRepository $userRepository)
    {}


    /**
     * @throws ValidationException
     */
    public function login(LoginRequest $request)
    {
        $user = $this->userRepository->getByEmail($request->email);

        if (!$user || !Hash::check($request->password, $user->password))
            throw ValidationException::withMessages(['Credentials incorrect']);

        if ($request->bearerToken() && !auth('sanctum')->check())
            return response('Token invalid', 401);

        return new UserLoginResource($user, $request->bearerToken());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function changePassword(ChangePasswordRequest $request) {
        return new UserResource($this->userRepository->setPassword($request->user()->id, Hash::make($request->password)));
    }

    public function sendPasswordResetLink(SendPasswordResetLinkRequest $request)
    {
        $user = $this->userRepository->getByEmail($request->email);

        if (!$user) {
            return response()->json(['message' => 'No user found with this email address'], 404);
        }

        // Generate and store the reset token
        $token = Str::random(60);
        DB::table('password_resets')->updateOrInsert(
            ['email' => $request->email],
            [
                'email' => $request->email,
                'token' => Hash::make($token),
                'created_at' => Carbon::now()
            ]
        );

        // Send the reset link via email (pseudo-code)
        // Password::sendResetLink($request->only('email')); // Laravel provides built-in functionality for this

        return response()->json(['message' => 'Password reset link sent.']);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $reset = DB::table('password_resets')
            ->where('email', $request->email)
            ->first();

        if (!$reset || !Hash::check($request->token, $reset->token)) {
            return response()->json(['message' => 'Invalid token'], 400);
        }

        $user = $this->userRepository->getByEmail($request->email);

        if (!$user) {
            return response()->json(['message' => 'No user found with this email address'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password has been reset successfully.']);
    }
}

