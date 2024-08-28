<?php

namespace App\Repositories;

use App\Models\ProjectCategory;
use App\Repositories\Interfaces\IProjectCategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectCategoryRepository implements IProjectCategoryRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?ProjectCategory
    {
        return $this->exists($id) ? ProjectCategory::find($id) : null;
    }

    public function getAll(): Collection
    {
        return ProjectCategory::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return ProjectCategory::where($column, $value)->where([$related])->get();
        return ProjectCategory::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return ProjectCategory::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return ProjectCategory::where('id', $id)->exists();
    }

    public function save(ProjectCategory $project_category): ?ProjectCategory
    {
        return $project_category->save() ? $project_category : null;
    }

    public function create(string $name): ?ProjectCategory
    {
        $project_category = new ProjectCategory([
            'name' => $name
        ]);
        return $this->save($project_category);
    }

    public function update(int $id, string $name): ?ProjectCategory
    {
        $project_category = $this->getOne($id);
        $project_category->name = $name;

        return $this->save($project_category);
    }
}
