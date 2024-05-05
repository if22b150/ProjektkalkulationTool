<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Lecturer\StoreLecturerRequest;
use App\Http\Resources\LecturerResource;
use App\Models\Faculty;
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

    public function store(StoreLecturerRequest $request, Faculty $faculty)
    {
        return new LecturerResource($this->lecturerRepository->create(
            $request->name,
            $request->hourlyRate,
            $request->dailyRate,
            $faculty->id
        ));
    }

   public function update(StoreLecturerRequest $request)
   {
       if(!$this->lecturerRepository->getOne($request->id))
           return response(null, 404);

       return new StoreLecturerRequest($this->lecturerRepository->update($request->id, $request->name, $request->hourlyRate, $request->dailyRate, $request->facultyId));
   }

    public function destroy(int $id)
    {
        if(!$this->lecturerRepository->getOne($id))
            return response(null, 404);

        $this->lecturerRepository->delete($id);

        return response(null, 204);
    }
}

