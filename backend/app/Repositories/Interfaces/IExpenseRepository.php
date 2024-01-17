<?php

namespace App\Repositories\Interfaces;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Collection;

interface IExpenseRepository
{
    public function getOne(int $id): ?Expense;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(Expense $expense): ?Expense;
//
    public function create(string $name, int $price): ?Expense;

    public function update(int $id, string $name): ?Expense;
}
