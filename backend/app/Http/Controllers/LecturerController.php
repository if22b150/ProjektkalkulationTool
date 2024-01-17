<?php

namespace App\Http\Controllers;

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
}

