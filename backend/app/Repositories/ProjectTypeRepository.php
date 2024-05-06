<?php

namespace App\Repositories;

use App\Models\ProjectType;
use App\Repositories\Interfaces\IProjectTypeRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectTypeRepository implements IProjectTypeRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?ProjectType
    {
        return $this->exists($id) ? ProjectType::find($id) : null;
    }

    public function getAll(): Collection
    {
        return ProjectType::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return ProjectType::where($column, $value)->where([$related])->get();
        return ProjectType::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return ProjectType::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return ProjectType::where('id', $id)->exists();
    }

    public function save(ProjectType $pt): ?ProjectType
    {
        return $pt->save() ? $pt : null;
    }

    public function create(string $name, string $code, bool $is_course): ?ProjectType
    {
        $pt = new ProjectType([
            'name' => $name,
            'code' => $code,
            'is_course' => $is_course
        ]);
        return $this->save($pt);
    }

    public function update(int $id, string $name): ?ProjectType
    {
        $expense = $this->getOne($id);
        $expense->name = $name;

        return $this->save($expense);
    }
}
