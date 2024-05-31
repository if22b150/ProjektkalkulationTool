<?php

namespace App\Http\Controllers;

use App\Enums\ERole;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Repositories\Interfaces\IProjectExpenseRepository;
use App\Repositories\Interfaces\IProjectFacultyRepository;
use App\Repositories\Interfaces\IProjectLecturerRepository;
use App\Repositories\Interfaces\IProjectRepository;
use App\Repositories\Interfaces\IProjectTypeRepository;
use App\Utils\ProjectToCSV;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;

class ProjectController extends Controller
{
    public function __construct(protected IProjectRepository $projectRepository,
                                protected IProjectLecturerRepository $projectLecturerRepository,
                                protected IProjectExpenseRepository $projectExpenseRepository,
                                protected IProjectFacultyRepository $projectFacultyRepository,
                                protected IProjectTypeRepository $projectTypeRepository)
    {}

    public function index(Request $request, int $facultyId)
    {
        if(!$facultyId && $request->user()->role == ERole::ADMIN)
            return ProjectResource::collection($this->projectRepository->getAll());

        return ProjectResource::collection($this->projectRepository->getWhere('faculty_id', $facultyId));
    }

    public function show(Request $request, int $facultyId, int $projectId)
    {
        $project = $this->projectRepository->getOne($projectId);
        if(!$project || $project->faculty_id != $facultyId && !$request->user()->role == ERole::ADMIN)
            return response('Not found',404);
        return new ProjectResource($this->projectRepository->getOne($projectId));
    }

    public function store(StoreProjectRequest $request, int $facultyId)
    {
        $projectType = $this->projectTypeRepository->getOne($request->projectTypeId);
        if($projectType->is_course) {
            $request->validate([
                'participants' => ['required', 'integer', 'min:1'],
                'duration' => ['required', 'integer', 'min:1'],
            ]);
        }

        try {
            $project = $this->projectRepository->create(
                $request->name,
                $request->costs,
                $request->firstname,
                $request->lastname,
                $request->email,
                Carbon::createFromFormat('Y-m-d', $request->start),
                Carbon::createFromFormat('Y-m-d', $request->end),
                $request->crossFaculty,
                $request->notes,
                $request->participants,
                $request->duration,
                $request->projectTypeId,
                $request->user()->id,
                $facultyId
            );

            foreach ($request->lecturers as $lecturer) {
                $this->projectLecturerRepository->create($project->id, $lecturer['id'], $lecturer['hours'], $lecturer['daily']);
            }
            foreach ($request->expenses as $expense) {
                $this->projectExpenseRepository->create($project->id, $expense['id'], $expense['costs']);
            }
            foreach ($request->crossFaculties as $f) {
                $this->projectFacultyRepository->create($project->id, $f['id']);
            }
        } catch (\Exception) {
            if($project)
                $this->projectRepository->delete($project->id);
        }

        return new ProjectResource($this->projectRepository->getOne($project->id));
    }

    public function destroy(int $id)
    {
        if(!$this->projectRepository->getOne($id))
            return response(null, 404);

        $this->projectRepository->delete($id);

        return response(null, 204);
    }

    public function exportToCSV(int $facultyId, int $projectId)
    {
        $project = $this->projectRepository->getOne($projectId);
        if(!$project || $project->faculty_id != $facultyId)
            return response('Not found',404);
        $response['csv_string'] = ProjectToCSV::getProjectCSVString($this->projectRepository->getOne($project->id));
        return $response;
    }

    public function exportToPDF(int $facultyId, int $projectId)
    {
        $project = $this->projectRepository->getOne($projectId);
        if(!$project || $project->faculty_id != $facultyId)
            return response('Not found',404);

        $pdf = App::make('dompdf.wrapper');

        $costs = number_format($project->costs / 100, 2, ',', '.');

        $view = view('pdf.project-pdf', [
            'project' => $project,
            'costs' => $costs
        ]);
        $view->render();
        $pdf->loadHTML($view);

        $response['pdf_string'] = $pdf->output();
//        return $response;

        return new Response($response, 200, array(
            'Content-Type' => 'application/pdf',
            'Content-Disposition' =>  'attachment; filename="x.pdf"'
        ));
    }

    protected function calculateContributionMargins(Project $project)
    {
        // Beispielhafte Logik, passe diese an deine Bedürfnisse an
        $variableCosts = $project->expenses()->sum('cost');
        $fixedCosts = 0; // Define how you obtain the fixed costs
        $revenue = 0; // Auch hier musst du definieren, wie du an die Einnahmen kommst

        $project->contribution_margin_1 = $revenue - $variableCosts;
        $project->contribution_margin_2 = $project->contribution_margin_1 - $fixedCosts;
        $project->save();
    }

}

