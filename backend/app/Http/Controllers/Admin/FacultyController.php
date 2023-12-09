<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\StoreFacultyRequest;
use App\Http\Resources\FacultyResource;
use App\Repositories\Interfaces\IFacultyRepository;


class FacultyController extends Controller
{
    public function __construct(protected IFacultyRepository $facultyRepository)
    {}

    public function index()
    {
        return FacultyResource::collection($this->facultyRepository->getAll());
    }

    public function show(int $id)
    {
        return new FacultyResource($this->facultyRepository->getOne($id));
    }

    public function store(StoreFacultyRequest $request)
    {
        return new FacultyResource($this->facultyRepository->create($request->name));
    }

    public function update(StoreFacultyRequest $request, int $id)
    {
        if(!$this->facultyRepository->getOne($id))
            return response(null, 404);

        return new FacultyResource($this->facultyRepository->update($id, $request->name));
    }

    public function destroy(int $id)
    {
        if(!$this->facultyRepository->getOne($id))
            return response(null, 404);

        $this->facultyRepository->delete($id);

        return response(null, 204);
    }
}

