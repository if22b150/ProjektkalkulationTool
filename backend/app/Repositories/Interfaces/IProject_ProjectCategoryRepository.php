<?php

namespace App\Repositories\Interfaces;

use App\Models\Project_ProjectCategory;
use App\Models\ProjectCategory;
use Illuminate\Database\Eloquent\Collection;

interface IProject_ProjectCategoryRepository
{
    public function getOne(int $id): ?Project_ProjectCategory;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $projectId, int $project_categoryId): bool;

    public function exists(int $id): bool;

    public function save(Project_ProjectCategory $project_projectCategoryId): ?Project_ProjectCategory;

    public function create(int $projectId, int $project_categoryId): ?Project_ProjectCategory;
}
