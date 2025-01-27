<?php

namespace App\Utils;

use App\Models\Project;
use Illuminate\Support\Facades\App;

class ProjectToPDF {
    public static function getProjectCSVStringPDF(Project $project, bool $isAdmin)
    {
        $pdf = App::make('dompdf.wrapper');

        $costs = number_format($project->costs / 100, 2, ',', '.');
        $pricePerDay = $isAdmin ? number_format(($project->price_for_course_per_day_override ?? $project->faculty->price_for_course_per_day) / 100, 2, ',', '.') : null;

        $view = view('project-pdf', [
            'project' => $project,
            'costs' => $costs,
            'pricePerDay' => $pricePerDay,
            'isAdmin' => $isAdmin,
        ]);

        $view->render();
        $pdf->loadHTML($view);

        return $pdf->download($project->name . '.pdf');
    }

}
