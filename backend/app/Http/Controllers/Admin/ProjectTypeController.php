<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectType\StoreProjectTypeRequest;
use App\Http\Resources\ProjectTypeResource;
use App\Repositories\Interfaces\IProjectTypeRepository;

class ProjectTypeController extends Controller
{
    public function __construct(protected IProjectTypeRepository $projectTypeRepository)
    {}

    public function index()
    {
        return ProjectTypeResource::collection($this->projectTypeRepository->getAll());
    }

    public function show(int $id)
    {
        return new ProjectTypeResource($this->projectTypeRepository->getOne($id));
    }

    public function store(StoreProjectTypeRequest $request)
    {
        return new ProjectTypeResource($this->projectTypeRepository->create($request->name, $request->code, $request->isCourse));
    }

    public function update(StoreProjectTypeRequest $request, int $id)
    {
        if(!$this->projectTypeRepository->getOne($id))
            return response(null, 404);

        return new ProjectTypeResource($this->projectTypeRepository->update($id, $request->name, $request->code, $request->isCourse));
    }

    public function destroy(int $id)
    {
        if(!$this->projectTypeRepository->getOne($id))
            return response(null, 404);

        $this->projectTypeRepository->delete($id);

        return response(null, 204);
    }
}

