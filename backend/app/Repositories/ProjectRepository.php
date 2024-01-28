<?php

namespace App\Repositories;

use App\Models\Project;
use App\Repositories\Interfaces\IProjectRepository;
use DateTime;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository implements IProjectRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?Project
    {
        return $this->exists($id) ? Project::find($id) : null;
    }

    public function getAll(): Collection
    {
        return Project::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return Project::where($column, $value)->where([$related])->get();
        return Project::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return Project::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return Project::where('id', $id)->exists();
    }

    public function save(Project $project): ?Project
    {
        return $project->save() ? $project : null;
    }

    public function create(string $name,
                           int $costs,
                           string $firstname,
                           string $lastname,
                           string $email,
                           DateTime $start,
                           DateTime $end,
                           bool $crossFaculty,
                           ?string $notes,
                           int $projectTypeId,
                           int $userId,
                           int $facultyId): ?Project
    {
        $project = new Project([
            'name' => $name,
            'costs' => $costs,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'start' => $start,
            'end' => $end,
            'cross_faculty' => $crossFaculty,
            'notes' => $notes,
            'project_type_id' => $projectTypeId,
            'user_id' => $userId,
            'faculty_id' => $facultyId
        ]);
        return $this->save($project);
    }
}
