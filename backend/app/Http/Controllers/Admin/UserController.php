<?php

namespace App\Http\Controllers\Admin;


use App\Enums\ERole;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\Interfaces\IUserRepository;
use App\Utils\PasswordGenerator;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function __construct(protected IUserRepository $userRepository)
    {}

    public function index()
    {
        return UserResource::collection($this->userRepository->getWhere('role', ERole::FACULTY));
    }

    public function show(int $id)
    {
        return new UserResource($this->userRepository->getOne($id));
    }

    public function store(StoreUserRequest $request)
    {
        $password = PasswordGenerator::generateStrongPassword(6);
        return new UserResource(
            $this->userRepository->create(
                $request->email,
                ERole::FACULTY,
                Hash::make($password),
                $request->faculty_id
            ),
            $password
        );
    }

//    public function update(StoreFacultyRequest $request, int $id)
//    {
//        if(!$this->facultyRepository->getOne($id))
//            return response(null, 404);
//
//        return new FacultyResource($this->facultyRepository->update($id, $request->name));
//    }

    public function destroy(int $id)
    {
        if(!$this->userRepository->getOne($id))
            return response(null, 404);

        $this->userRepository->delete($id);

        return response(null, 204);
    }
}

