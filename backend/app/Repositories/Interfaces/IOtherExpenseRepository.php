<?php

namespace App\Repositories\Interfaces;

use App\Models\OtherExpense;
use Illuminate\Database\Eloquent\Collection;

interface IOtherExpenseRepository
{
    public function getOne(int $id): ?OtherExpense;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(OtherExpense $otherExpense): ?OtherExpense;

    public function create(
        string $name,
        int $costs,
        int $projectId
    ): ?OtherExpense;
}
