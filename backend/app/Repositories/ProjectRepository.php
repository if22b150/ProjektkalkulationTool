<?php

namespace App\Repositories;

use App\Models\Project;
use App\Repositories\Interfaces\IProjectRepository;
use DateTime;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class ProjectRepository implements IProjectRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?Project
    {
        return Project::findOrFail($id);
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

    public function getAllByCompanyId(int $companyId): Collection
    {
        return Project::where('company_id', $companyId)->get();
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
                           ?int $participants,
                           ?int $duration,
                           ?int $ects,
                           int $projectTypeId,
                           int $companyId,
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
            'participants' => $participants,
            'duration' => $duration,
            'ects' => $ects,
            'is_opened' => false,
            'project_type_id' => $projectTypeId,
            'company_id' => $companyId,
            'user_id' => $userId,
            'faculty_id' => $facultyId
        ]);


        return $this->save($project);
    }

    public function update( int $id,
                            string $name,
                            int $costs,
                            string $firstname,
                            string $lastname,
                            string $email,
                            DateTime $start,
                            DateTime $end,
                            bool $crossFaculty,
                            ?string $notes,
                            ?int $participants,
                            ?int $duration,
                            ?int $ects,
                            int $projectTypeId,
                            int $companyId,
                            ?int $priceForCoursePerDayOverride): ?Project
    {

        $project = $this->getOne($id);
        $project->name = $name;
        $project->costs = $costs;
        $project->firstname = $firstname;
        $project->lastname = $lastname;
        $project->email = $email;
        $project->start = $start;
        $project->end = $end;
        $project->cross_faculty = $crossFaculty;
        $project->notes = $notes;
        $project->participants = $participants;
        $project->duration = $duration;
        $project->ects = $ects;
        $project->project_type_id = $projectTypeId;
        $project->company_id = $companyId;
        $project->price_for_course_per_day_override = $priceForCoursePerDayOverride;

        return $this->save($project);
    }

    public function updateIsOpened(int $id, bool $isOpened): ?Project
    {
        $project = $this->getOne($id);
        $project->is_opened = $isOpened;
        return $this->save($project);
    }

    public function getAllByFacultiesId(int $facultyId): Collection
    {
        return Project::where('faculty_id', $facultyId)->get();
    }
}
