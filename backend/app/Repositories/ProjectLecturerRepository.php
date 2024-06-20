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
        if ($related)
            return ProjectLecturer::where($column, $value)->where([$related])->get();
        return ProjectLecturer::where($column, $value)->get();
    }

    public function delete(int $projectId, int $lecturerId): bool
    {
        return ProjectLecturer::where('project_id', $projectId)
                ->where('lecturer_id', $lecturerId)
                ->delete() == 1;
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

    public function update(int  $projectId,
                           int  $lecturerId,
                           int  $hours,
                           bool $daily,
                           ?int $hourlyRateOverride,
                           ?int $dailyRateOverride): ?ProjectLecturer
    {
        $updated = ProjectLecturer::where('project_id', $projectId)
            ->where('lecturer_id', $lecturerId)
            ->update([
                'hours' => $hours,
                'daily' => $daily,
                'hourly_rate_override' => $hourlyRateOverride,
                'daily_rate_override' => $dailyRateOverride,
            ]);

        return $updated ? ProjectLecturer::where('project_id', $projectId)
            ->where('lecturer_id', $lecturerId)
            ->first() : null;
    }

    public function getLecturerIdsByProjectId(int $projectId): array
    {
        return ProjectLecturer::where('project_id', $projectId)->pluck('lecturer_id')->toArray();
    }
}
