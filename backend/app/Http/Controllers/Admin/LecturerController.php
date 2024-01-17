<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Lecturer\StoreLecturerRequest;
use App\Http\Resources\LecturerResource;
use App\Repositories\Interfaces\ILecturerRepository;


class LecturerController extends Controller
{
    public function __construct(protected ILecturerRepository $lecturerRepository)
    {}

    public function index()
    {
        return LecturerResource::collection($this->lecturerRepository->getAll());
    }

    public function show(int $id)
    {
        return new LecturerResource($this->lecturerRepository->getOne($id));
    }

    public function store(StoreLecturerRequest $request)
    {
        return new LecturerResource($this->lecturerRepository->create(
            $request->name,
            $request->hourlyRate,
            $request->dailyRate
        ));
    }

//    public function update(StoreFacultyRequest $request, int $id)
//    {
//        if(!$this->facultyRepository->getOne($id))
//            return response(null, 404);
//
//        return new FacultyResource($this->facultyRepository->update($id, $request->name));
//    }

    public function destroy(int $id)
    {
        if(!$this->lecturerRepository->getOne($id))
            return response(null, 404);

        $this->lecturerRepository->delete($id);

        return response(null, 204);
    }
}

