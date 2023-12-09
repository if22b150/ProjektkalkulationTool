<?php

namespace App\Http\Controllers;


use App\Http\Requests\User\LoginRequest;
use App\Http\Resources\UserLoginResource;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


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
}

