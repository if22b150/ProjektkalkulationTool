<?php

namespace App\Repositories\Interfaces;

use App\Models\ProjectExpense;
use Illuminate\Database\Eloquent\Collection;

interface IProjectExpenseRepository
{
    public function getOne(int $id): ?ProjectExpense;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $projectId, int $expenseId): bool;

    public function exists(int $id): bool;

    public function save(ProjectExpense $projectExpense): ?ProjectExpense;

    public function create(int $projectId, int $expenseId, int $costs): ?ProjectExpense;
}
