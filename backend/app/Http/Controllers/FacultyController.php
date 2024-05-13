<?php

namespace App\Http\Controllers;

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
}

