<?php

namespace App\Utils;

use App\Models\Project;
use Illuminate\Support\Facades\App;

class ProjectToPDF {
    public static function getProjectCSVStringPDF(Project $project)
    {
        $pdf = App::make('dompdf.wrapper');

        $costs = number_format($project->costs / 100, 2, ',', '.');

        $view = view('project-pdf', [
            'project' => $project,
            'costs' => $costs
        ]);
        $view->render();
        $pdf->loadHTML($view);

        return $pdf->download('x.pdf');
    }
}
