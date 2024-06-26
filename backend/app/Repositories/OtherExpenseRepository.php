<?php

namespace App\Repositories;

use App\Models\OtherExpense;
use App\Repositories\Interfaces\IOtherExpenseRepository;
use Illuminate\Database\Eloquent\Collection;

class OtherExpenseRepository implements IOtherExpenseRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?OtherExpense
    {
        return $this->exists($id) ? OtherExpense::find($id) : null;
    }

    public function getAll(): Collection
    {
        return OtherExpense::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return OtherExpense::where($column, $value)->where([$related])->get();
        return OtherExpense::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return OtherExpense::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return OtherExpense::where('id', $id)->exists();
    }

    public function save(OtherExpense $otherExpense): ?OtherExpense
    {
        return $otherExpense->save() ? $otherExpense : null;
    }

    public function create(string $name,
                           int $costs,
                           bool $perParticipant,
                           int $projectId): ?OtherExpense
    {
        $otherExpense = new OtherExpense([
            'name' => $name,
            'costs' => $costs,
            'per_participant' => $perParticipant,
            'project_id' => $projectId
        ]);
        return $this->save($otherExpense);
    }

    public function getOtherExpenseIdsByProjectId(int $projectId): array
    {
        return OtherExpense::where('project_id', $projectId)->pluck('id')->toArray();
    }

    public function update(int      $id,
                           string   $name,
                           int      $costs,
                           bool     $perParticipant): ?OtherExpense
    {
        $updated = OtherExpense::where('id', $id)
            ->update([
                'costs' => $costs,
                'name' => $name,
                'per_participant' => $perParticipant,
            ]);

        return $updated ? $this->getOne($id) : null;
    }
}
