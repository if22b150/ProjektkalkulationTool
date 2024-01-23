<?php

namespace App\Repositories\Interfaces;

use App\Models\ProjectLecturer;
use Illuminate\Database\Eloquent\Collection;

interface IProjectLecturerRepository
{
    public function getOne(int $id): ?ProjectLecturer;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(ProjectLecturer $projectLecturer): ?ProjectLecturer;

    public function create(int $projectId, int $lecturerId, int $hours): ?ProjectLecturer;
}
