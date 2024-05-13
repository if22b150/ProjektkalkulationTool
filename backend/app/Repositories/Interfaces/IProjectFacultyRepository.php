<?php

namespace App\Repositories\Interfaces;

use App\Models\ProjectFaculty;
use Illuminate\Database\Eloquent\Collection;

interface IProjectFacultyRepository
{
    public function getOne(int $id): ?ProjectFaculty;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(ProjectFaculty $projectFaculty): ?ProjectFaculty;

    public function create(int $projectId, int $facultyId): ?ProjectFaculty;
}
