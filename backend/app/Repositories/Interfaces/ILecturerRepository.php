<?php

namespace App\Repositories\Interfaces;

use App\Models\Lecturer;
use Illuminate\Database\Eloquent\Collection;

interface ILecturerRepository
{
    public function getOne(int $id): ?Lecturer;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(Lecturer $faculty): ?Lecturer;
//
    public function create(string $name, int $hourlyRate, int $dailyRate, int $facultyId): ?Lecturer;

    public function update(int $id, string $name, int $hourlyRate, int $dailyRate, int $facultyId): ?Lecturer;
}
