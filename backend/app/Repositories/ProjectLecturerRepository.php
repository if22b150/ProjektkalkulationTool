<?php

namespace App\Repositories;

use App\Models\ProjectLecturer;
use App\Repositories\Interfaces\IProjectLecturerRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectLecturerRepository implements IProjectLecturerRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?ProjectLecturer
    {
        return $this->exists($id) ? ProjectLecturer::find($id) : null;
    }

    public function getAll(): Collection
    {
        return ProjectLecturer::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return ProjectLecturer::where($column, $value)->where([$related])->get();
        return ProjectLecturer::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return ProjectLecturer::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return ProjectLecturer::where('id', $id)->exists();
    }

    public function save(ProjectLecturer $projectLecturer): ?ProjectLecturer
    {
        return $projectLecturer->save() ? $projectLecturer : null;
    }

    public function create(int $projectId, int $lecturerId, int $hours, bool $daily): ?ProjectLecturer
    {
        $projectLecturer = new ProjectLecturer([
            'hours' => $hours,
            'project_id' => $projectId,
            'lecturer_id' => $lecturerId,
            'daily' => $daily
        ]);
        return $this->save($projectLecturer);
    }
}
