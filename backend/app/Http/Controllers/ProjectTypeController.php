<?php

namespace App\Http\Controllers;

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
}

