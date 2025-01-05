<?php

namespace App\Repositories\Interfaces;

use App\Models\Company;
use Illuminate\Database\Eloquent\Collection;

interface ICompanyRepository
{
    public function getOne(int $id): ?Company;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(Company $company): ?Company;

    public function create(string $name, $file): ?Company;

    public function update(int $id, string $name, $file): ?Company;
}
