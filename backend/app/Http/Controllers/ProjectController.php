<?php

namespace App\Http\Controllers;

use App\Enums\ERole;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Repositories\Interfaces\IOtherExpenseRepository;
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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class ProjectController extends Controller
{
    public function __construct(protected IProjectRepository         $projectRepository,
                                protected IProjectLecturerRepository $projectLecturerRepository,
                                protected IProjectExpenseRepository  $projectExpenseRepository,
                                protected IProjectFacultyRepository  $projectFacultyRepository,
                                protected IOtherExpenseRepository    $otherExpenseRepository,
                                protected IProjectTypeRepository     $projectTypeRepository)
    {
    }

    public function index(Request $request, int $facultyId = null)
    {
        if (!$facultyId && $request->user()->role == ERole::ADMIN)
            return ProjectResource::collection($this->projectRepository->getAll());

        return ProjectResource::collection($this->projectRepository->getWhere('faculty_id', $facultyId));
    }

    public function show(Request $request, int $facultyId, int $projectId = null)
    {
        // for admin requests, there is not facultyId provided
        if (!$projectId)
            $projectId = $facultyId;

        $project = $this->projectRepository->getOne($projectId);
        if (!$project || ($project->faculty_id != $facultyId && !$request->user()->role == ERole::ADMIN))
            return response('Not found', 404);

        if($request->user()->role == ERole::ADMIN && !$project->is_opened)
            $this->projectRepository->updateIsOpened($projectId, true);

        return new ProjectResource($this->projectRepository->getOne($projectId));
    }

    public function store(StoreProjectRequest $request, int $facultyId)
    {
        $projectType = $this->projectTypeRepository->getOne($request->projectTypeId);
        if ($projectType->is_course) {
            $request->validate([
                'participants' => ['required', 'integer', 'min:1'],
                'duration' => ['required', 'integer', 'min:1'],
            ]);
        }

        try {
            DB::beginTransaction();
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
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response('Project could not be created: ' . $e->getMessage(), 500);
        }

        return new ProjectResource($this->projectRepository->getOne($project->id));
    }

    public function update(StoreProjectRequest $request, int $facultyId, int $projectId)
    {
        $projectType = $this->projectTypeRepository->getOne($request->projectTypeId);
        if ($projectType->is_course) {
            $request->validate([
                'participants' => ['required', 'integer', 'min:1'],
                'duration' => ['required', 'integer', 'min:1'],
            ]);
        }

        try {
            DB::beginTransaction();
            $project = $this->projectRepository->update(
                $request->projectId,
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
                $request->priceForCoursePerDayOverride
            );

            $this->_updateLecturers($request->lecturers, $projectId);
            $this->_updateExpenses($request->expenses, $projectId);
            $this->_updateCrossFaculties($request->crossFaculties, $projectId);
            $this->_updateOtherExpenses($request->otherExpenses, $projectId);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response('Project could not be updated: ' . $e->getMessage(), 500);
        }

        return new ProjectResource($this->projectRepository->getOne($project->id));
    }

    public function isOpened(StoreProjectRequest $request, int $facultyId, int $projectId)
    {
        if (!$this->projectRepository->getOne($projectId))
            return response("Gibs nd ...", 404);

        Log::info('Dies ist eine Info-Nachricht: ' . $request->getContent());
        try {
            $project = $this->projectRepository->updateIsOpen(
                $request->projectId,
                $facultyId,
                $request->isOpened,
            );
        } catch (\Exception) {

        }
        return new ProjectResource($this->projectRepository->getOne($project->id));
    }

    public function destroy(int $id)
    {
        if (!$this->projectRepository->getOne($id))
            return response(null, 404);

        $this->projectRepository->delete($id);

        return response(null, 204);
    }

    public function exportToCSV(int $facultyId, int $projectId)
    {
        $project = $this->projectRepository->getOne($projectId);
        if (!$project || $project->faculty_id != $facultyId)
            return response('Not found', 404);
        $response['csv_string'] = ProjectToCSV::getProjectCSVString($this->projectRepository->getOne($project->id));
        return $response;
    }

    public function exportToPDF(int $facultyId, int $projectId)
    {
        $project = $this->projectRepository->getOne($projectId);
        if (!$project || $project->faculty_id != $facultyId)
            return response('Not found', 404);

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
            'Content-Disposition' => 'attachment; filename="x.pdf"'
        ));
    }


    private function _updateLecturers(array $lecturers, $projectId)
    {
        $currentLecturerIds = $this->projectLecturerRepository->getLecturerIdsByProjectId($projectId);
        $newLecturerIds = array_map(function ($lecturer) {
            return $lecturer['id'];
        }, $lecturers);

        // Löschen von nicht mehr existierenden Lecturers
        $lecturersToDelete = array_diff($currentLecturerIds, $newLecturerIds);
        foreach ($lecturersToDelete as $lecturerId) {
            $this->projectLecturerRepository->delete($projectId, $lecturerId);
        }

        // Hinzufügen oder Aktualisieren von Lecturers
        foreach ($lecturers as $lecturer) {
            if (in_array($lecturer['id'], $currentLecturerIds)) {
                // Existierenden Lecturer aktualisieren
                $this->projectLecturerRepository->update(
                    $projectId,
                    $lecturer['id'],
                    $lecturer['hours'],
                    $lecturer['daily'],
                    $lecturer['hourlyRateOverride'],
                    $lecturer['dailyRateOverride']
                );
            } else {
                // Neuen Lecturer hinzufügen
                $this->projectLecturerRepository->create($projectId, $lecturer['id'], $lecturer['hours'], $lecturer['daily']);
            }
        }
    }

    private function _updateExpenses(array $expenses, $projectId)
    {
        $currentExpenseIds = $this->projectExpenseRepository->getExpenseIdsByProjectId($projectId);
        $newExpenseIds = array_map(function ($expense) {
            return $expense['id'];
        }, $expenses);

        // Löschen von nicht mehr existierenden Expenses
        $expensesToDelete = array_diff($currentExpenseIds, $newExpenseIds);
        foreach ($expensesToDelete as $expenseId) {
            $this->projectExpenseRepository->delete($projectId, $expenseId);
        }

        // Hinzufügen oder Aktualisieren von Expenses
        foreach ($expenses as $expense) {
            if (in_array($expense['id'], $currentExpenseIds)) {
                // Existierende Expense aktualisieren
                $this->projectExpenseRepository->update($projectId, $expense['id'], $expense['costs']);
            } else {
                // Neue Expense hinzufügen
                $this->projectExpenseRepository->create($projectId, $expense['id'], $expense['costs']);
            }
        }
    }

    private function _updateOtherExpenses(array $otherExpenses, $projectId)
    {
        $currentOtherExpenseIds = $this->otherExpenseRepository->getOtherExpenseIdsByProjectId($projectId);
        $newOtherExpenseIds = array_map(function ($oe) {
            return $oe['id'];
        }, $otherExpenses);

        // Löschen von nicht mehr existierenden Expenses
        $expensesToDelete = array_diff($currentOtherExpenseIds, $newOtherExpenseIds);
        foreach ($expensesToDelete as $expenseId) {
            $this->otherExpenseRepository->delete($expenseId);
        }

        // Hinzufügen oder Aktualisieren von Expenses
        foreach ($otherExpenses as $expense) {
            if (in_array($expense['id'], $currentOtherExpenseIds)) {
                // Existierende Expense aktualisieren
                $this->otherExpenseRepository->update($expense['id'],$expense['name'], $expense['costs']);
            } else {
                // Neue Expense hinzufügen
                $this->otherExpenseRepository->create($expense['name'], $expense['costs'],$projectId);
            }
        }
    }

    private function _updateCrossFaculties(array $faculties, $projectId)
    {
        $currentFacultyIds = $this->projectFacultyRepository->getFacultyIdsByProjectId($projectId);
        $newFacultyIds = array_map(function ($f) {
            return $f['id'];
        }, $faculties);

        // Löschen von nicht mehr existierenden Faculties
        $facultiesToDelete = array_diff($currentFacultyIds, $newFacultyIds);
        foreach ($facultiesToDelete as $facultyId) {
            $this->projectFacultyRepository->delete($projectId, $facultyId);
        }

        // Hinzufügen oder Aktualisieren von Faculties
        foreach ($faculties as $f) {
            if (in_array($f['id'], $currentFacultyIds)) {
                // Existierende Faculty aktualisieren (falls nötig)
                $this->projectFacultyRepository->update($projectId, $f['id']);
            } else {
                // Neue Faculty hinzufügen
                $this->projectFacultyRepository->create($projectId, $f['id']);
            }
        }
    }
}

