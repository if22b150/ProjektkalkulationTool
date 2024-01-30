<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Repositories\Interfaces\IProjectExpenseRepository;
use App\Repositories\Interfaces\IProjectLecturerRepository;
use App\Repositories\Interfaces\IProjectRepository;
use App\Utils\ProjectToCSV;
use Carbon\Carbon;

class ProjectController extends Controller
{
    public function __construct(protected IProjectRepository $projectRepository,
                                protected IProjectLecturerRepository $projectLecturerRepository,
                                protected IProjectExpenseRepository $projectExpenseRepository)
    {}

    public function index(int $facultyId)
    {
        return ProjectResource::collection($this->projectRepository->getWhere('faculty_id', $facultyId));
    }

    public function show(int $facultyId, int $projectId)
    {
        $project = $this->projectRepository->getOne($projectId);
        if(!$project || $project->faculty_id != $facultyId)
            return response('Not found',404);
        return new ProjectResource($this->projectRepository->getOne($projectId));
    }

    public function store(StoreProjectRequest $request, int $facultyId)
    {
        try {
            $project = $this->projectRepository->create(
                $request->name,
                $request->costs,
                $request->firstname,
                $request->lastname,
                $request->email,
                Carbon::createFromFormat('Y-m-d', $request->start),
                Carbon::createFromFormat('Y-m-d', $request->end),
                $request->crossFaculty,
                $request->notes,
                $request->projectTypeId,
                $request->user()->id,
                $facultyId
            );

            foreach ($request->lecturers as $lecturer) {
                $this->projectLecturerRepository->create($project->id, $lecturer['id'], $lecturer['hours']);
            }
            foreach ($request->expenses as $expense) {
                $this->projectExpenseRepository->create($project->id, $expense['id'], $expense['costs']);
            }
        } catch (\Exception) {
            if($project)
                $this->projectRepository->delete($project->id);
        }

        return new ProjectResource($this->projectRepository->getOne($project->id));
    }

    public function destroy(int $id)
    {
        if(!$this->projectRepository->getOne($id))
            return response(null, 404);

        $this->projectRepository->delete($id);

        return response(null, 204);
    }

    public function exportToCSV(int $facultyId, int $projectId)
    {
        $project = $this->projectRepository->getOne($projectId);
        if(!$project || $project->faculty_id != $facultyId)
            return response('Not found',404);
        $response['csv_string'] = ProjectToCSV::getProjectCSVString($this->projectRepository->getOne($project->id));
        return $response;
    }
}

