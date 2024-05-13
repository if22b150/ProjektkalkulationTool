<?php

namespace App\Repositories;

use App\Models\ProjectFaculty;
use App\Repositories\Interfaces\IProjectFacultyRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectFacultyRepository implements IProjectFacultyRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?ProjectFaculty
    {
        return $this->exists($id) ? ProjectFaculty::find($id) : null;
    }

    public function getAll(): Collection
    {
        return ProjectFaculty::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return ProjectFaculty::where($column, $value)->where([$related])->get();
        return ProjectFaculty::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return ProjectFaculty::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return ProjectFaculty::where('id', $id)->exists();
    }

    public function save(ProjectFaculty $projectFaculty): ?ProjectFaculty
    {
        return $projectFaculty->save() ? $projectFaculty : null;
    }

    public function create(int $projectId, int $facultyId): ?ProjectFaculty
    {
        $projectFaculty = new ProjectFaculty([
            'project_id' => $projectId,
            'faculty_id' => $facultyId,
        ]);
        return $this->save($projectFaculty);
    }
}
