<?php

namespace App\Repositories;

use App\Models\GroupSpecificExpense;
use App\Repositories\Interfaces\IGroupSpecificExpenseRepository;
use Illuminate\Database\Eloquent\Collection;

class GroupSpecificExpenseRepository implements IGroupSpecificExpenseRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?GroupSpecificExpense
    {
        return $this->exists($id) ? GroupSpecificExpense::find($id) : null;
    }

    public function getAll(): Collection
    {
        return GroupSpecificExpense::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return GroupSpecificExpense::where($column, $value)->where([$related])->get();
        return GroupSpecificExpense::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return GroupSpecificExpense::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return GroupSpecificExpense::where('id', $id)->exists();
    }

    public function save(GroupSpecificExpense $groupSpecificExpense): ?GroupSpecificExpense
    {
        return $groupSpecificExpense->save() ? $groupSpecificExpense : null;
    }

    public function create(string $name,
                           int $costs,
                           bool $perParticipant,
                           int $projectId): ?GroupSpecificExpense
    {
        $groupSpecificExpense = new GroupSpecificExpense([
            'name' => $name,
            'costs' => $costs,
            'per_participant' => $perParticipant,
            'project_id' => $projectId
        ]);
        error_log('ADDING: ' . print_r($groupSpecificExpense, true));
        return $this->save($groupSpecificExpense);
    }

    public function getGroupSpecificExpenseIdsByProjectId(int $projectId): array
    {
        return GroupSpecificExpense::where('project_id', $projectId)->pluck('id')->toArray();
    }

    public function update(int      $id,
                           string   $name,
                           int      $costs,
                           bool     $perParticipant): ?GroupSpecificExpense
    {
        $updated = GroupSpecificExpense::where('id', $id)
            ->update([
                'costs' => $costs,
                'name' => $name,
                'per_participant' => $perParticipant,
            ]);

        return $updated ? $this->getOne($id) : null;
    }
}
