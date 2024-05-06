<?php

namespace App\Repositories\Interfaces;

use App\Models\Faculty;
use Illuminate\Database\Eloquent\Collection;

interface IFacultyRepository
{
    public function getOne(int $id): ?Faculty;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(Faculty $faculty): ?Faculty;
//
    public function create(string $name, int $price_for_course_per_day): ?Faculty;

    public function update(int $id, string $name, int $price_for_course_per_day): ?Faculty;
}
