<?php

namespace App\Http\Controllers\Admin;

use App\Enums\EProjectState;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Repositories\Interfaces\IProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class ProjectController extends Controller
{
    public function __construct(protected IProjectRepository $projectRepository)
    {
    }

    public function updateState(Request $request, int $projectId)
    {

        $request->validate([
            'state' => ['required', Rule::enum(EProjectState::class)],
        ]);

        return new ProjectResource($this->projectRepository->updateState($projectId, $request->state));
    }
}

