<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Repositories\Interfaces\IProjectExpenseRepository;
use App\Repositories\Interfaces\IProjectLecturerRepository;
use App\Repositories\Interfaces\IProjectRepository;

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

    public function store(StoreProjectRequest $request, int $facultyId)
    {
        $project = $this->projectRepository->create(
            $request->name,
            $request->costs,
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

        return new ProjectResource($this->projectRepository->getOne($project->id));
    }

    public function destroy(int $id)
    {
        if(!$this->projectTypeRepository->getOne($id))
            return response(null, 404);

        $this->projectTypeRepository->delete($id);

        return response(null, 204);
    }
}

