<?php

namespace App\Repositories;

use App\Models\Project_ProjectCategory;
use App\Repositories\Interfaces\IProject_ProjectCategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class Project_ProjectCategoryRepository implements IProject_ProjectCategoryRepository
{
    public function __construct()
    {
    }

    public function getOne(int $id): ?Project_ProjectCategory
    {
        return $this->exists($id) ? Project_ProjectCategory::find($id) : null;
    }

    public function getAll(): Collection
    {
        return Project_ProjectCategory::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if ($related)
            return Project_ProjectCategory::where($column, $value)->where([$related])->get();
        return Project_ProjectCategory::where($column, $value)->get();
    }

    public function delete(int $projectId, int $project_categoryId): bool
    {
        return Project_ProjectCategory::where('project_id', $projectId)
                ->where('expense_id', $project_categoryId)
                ->delete() == 1;
    }

    public function exists(int $id): bool
    {
        return Project_ProjectCategory::where('id', $id)->exists();
    }

    public function save(Project_ProjectCategory $project_projectCategoryId): ?Project_ProjectCategory
    {
        return $project_projectCategoryId->save() ? $project_projectCategoryId : null;
    }

    public function create(int $projectId, int $project_categoryId): ?Project_ProjectCategory
    {
        $project_projectCategoryId = new Project_ProjectCategory([
            'project_id' => $projectId,
            'expense_id' => $project_categoryId,
        ]);
        return $this->save($project_projectCategoryId);
    }

    public function getProjectCategoryIdsByProjectId(int $projectId): array
    {
        return Project_ProjectCategory::where('project_id', $projectId)->pluck('project_categoryId')->toArray();
    }
}
