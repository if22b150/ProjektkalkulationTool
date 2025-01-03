<?php

namespace App\Repositories\Interfaces;

use App\Enums\ERole;
use App\Models\User;
use http\Env\Response;
use Illuminate\Database\Eloquent\Collection;

interface IUserRepository
{
    public function getOne(int $id): ?User;

    public function getAll(?string $role = null): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function getByEmail(string $email): ?User;

    public function exists(int $id): bool;

    public function save(User $user): ?User;

//    public function update(int $id,
//                           string $email): ?User;
//
    public function create(string $email,
                           ERole $role,
                           string $password,
                           ?int $faculty_id): ?User;

    public function reset_password(User $user): ?User;

    public function verifyToken(string $email, string $token): void;
}
