<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectCategoryResource;
use App\Repositories\Interfaces\IProjectCategoryRepository;

class ProjectCategoryController extends Controller
{
    public function __construct(protected IProjectCategoryRepository $projectCategoryRepository)
    {}

    public function index()
    {
        return ProjectCategoryResource::collection($this->projectCategoryRepository->getAll());
    }
}

