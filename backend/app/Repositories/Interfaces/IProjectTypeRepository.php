<?php

namespace App\Repositories\Interfaces;

use App\Models\ProjectType;
use Illuminate\Database\Eloquent\Collection;

interface IProjectTypeRepository
{
    public function getOne(int $id): ?ProjectType;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(ProjectType $pt): ?ProjectType;
//
    public function create(string $name, string $code, bool $is_course): ?ProjectType;

    public function update(int $id, string $name, string $code, bool $is_course): ?ProjectType;
}
