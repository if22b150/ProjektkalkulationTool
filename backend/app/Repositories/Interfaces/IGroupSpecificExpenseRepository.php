<?php

namespace App\Repositories\Interfaces;

use App\Models\GroupSpecificExpense;
use Illuminate\Database\Eloquent\Collection;

interface IGroupSpecificExpenseRepository
{
    public function getOne(int $id): ?GroupSpecificExpense;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(GroupSpecificExpense $groupSpecificExpense): ?GroupSpecificExpense;

    public function create(
        string $name,
        int $costs,
        bool $perParticipant,
        int $projectId
    ): ?GroupSpecificExpense;

    public function getGroupSpecificExpenseIdsByProjectId(int $projectId): array;

    public function update(int      $id,
                           string   $name,
                           int      $costs,
                           bool     $perParticipant): ?GroupSpecificExpense;
}
