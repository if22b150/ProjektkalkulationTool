<?php

namespace App\Repositories\Interfaces;

use App\Models\ProjectCategory;
use Illuminate\Database\Eloquent\Collection;

interface IProjectCategoryRepository
{
    public function getOne(int $id): ?ProjectCategory;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(ProjectCategory $project_category): ?ProjectCategory;
//
    public function create(string $name): ?ProjectCategory;

    public function update(int $id, string $name): ?ProjectCategory;
}
