<?php

namespace App\Repositories\Interfaces;

use App\Models\Faculty;
use Illuminate\Database\Eloquent\Collection;

interface IFacultyRepository
{
    public function getOne(int $id): ?Faculty;

    public function getAll(?string $role = null): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(Faculty $faculty): ?Faculty;
//
    public function create(string $name): ?Faculty;

    public function update(int $id, string $name): ?Faculty;
}
