<?php

namespace App\Repositories;

use App\Models\ProjectExpense;
use App\Repositories\Interfaces\IProjectExpenseRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectExpenseRepository implements IProjectExpenseRepository
{
    public function __construct()
    {
    }

    public function getOne(int $id): ?ProjectExpense
    {
        return $this->exists($id) ? ProjectExpense::find($id) : null;
    }

    public function getAll(): Collection
    {
        return ProjectExpense::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if ($related)
            return ProjectExpense::where($column, $value)->where([$related])->get();
        return ProjectExpense::where($column, $value)->get();
    }

    public function delete(int $projectId, int $expenseId): bool
    {
        return ProjectExpense::where('project_id', $projectId)
                ->where('expense_id', $expenseId)
                ->delete() == 1;
    }

    public function exists(int $id): bool
    {
        return ProjectExpense::where('id', $id)->exists();
    }

    public function save(ProjectExpense $projectExpense): ?ProjectExpense
    {
        return $projectExpense->save() ? $projectExpense : null;
    }

    public function create(int $projectId, int $expenseId, int $costs): ?ProjectExpense
    {
        $projectExpense = new ProjectExpense([
            'costs' => $costs,
            'project_id' => $projectId,
            'expense_id' => $expenseId,
        ]);
        return $this->save($projectExpense);
    }

    public function update(int $projectId, int $expenseId, float $costs): ?ProjectExpense
    {
        $updated = ProjectExpense::where('project_id', $projectId)
            ->where('expense_id', $expenseId)
            ->update([
                'costs' => $costs
            ]);

        return $updated ? ProjectExpense::where('project_id', $projectId)
            ->where('expense_id', $expenseId)
            ->first() : null;
    }

    public function getExpenseIdsByProjectId(int $projectId): array
    {
        return ProjectExpense::where('project_id', $projectId)->pluck('expense_id')->toArray();
    }
}
