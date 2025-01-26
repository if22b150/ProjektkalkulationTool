<?php

namespace App\Utils;

use App\Enums\EProjectState;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectsReportCSV {
    public static function getProjectsReportCSVString(Collection $projects, bool $isAdmin)
    {
        $csv = fopen('php://temp', 'w+');

        if ($csv === false) {
            throw new \Exception('Failed to open php://temp');
        }

        $separator = ';';
        fwrite($csv, "\xEF\xBB\xBF"); // begin CSV with BOM

//        // Add header with project count
//        fputcsv($csv, ['Number of Projects', $projects->count()], $separator);
//
//        // Add empty line
//        fputcsv($csv, [], $separator);

        // Add column headers
        fputcsv($csv, $isAdmin ? ProjectsReportCSV::getAdminProjectsCSVKeys() : ProjectsReportCSV::getProjectsCSVKeys(), $separator);

        // Add project rows
        foreach ($projects as $project) {
            fputcsv($csv, $isAdmin ? ProjectsReportCSV::createAdminProjectCSVArray($project) : ProjectsReportCSV::createProjectCSVArray($project), $separator);
        }

        rewind($csv);
        return stream_get_contents($csv);
    }

    private static function getProjectsCSVKeys(): array
    {
        return [
            'NAME', 'COMPANY', 'TYPE', 'CREATED AT', 'START DATE', 'END DATE', 'COSTS', 'STATE'
        ];
    }
    private static function getAdminProjectsCSVKeys(): array
    {
        return [
            'NAME', 'COMPANY', 'FACULTY', 'TYPE', 'CREATED AT', 'START DATE', 'END DATE', 'COSTS', 'STATE'
        ];
    }

    private static function createProjectCSVArray(Project $project): array
    {
        return [
            'NAME' => $project->name,
            'COMPANY' => $project->company->name ?? '',
            'TYPE' => $project->projectType->name ?? '',
            'CREATED' => ProjectsReportCSV::convertDateTime($project->created_at),
            'START' => ProjectsReportCSV::convertDateTime($project->start),
            'END' => ProjectsReportCSV::convertDateTime($project->end),
            'COSTS' => $project->costs / 100,
            'STATE' => ProjectsReportCSV::castState($project->state)
        ];
    }

    private static function createAdminProjectCSVArray(Project $project): array
    {
        return [
            'NAME' => $project->name,
            'COMPANY' => $project->company->name ?? '',
            'FACULTY' => $project->faculty->name ?? '',
            'TYPE' => $project->projectType->name ?? '',
            'CREATED' => ProjectsReportCSV::convertDateTime($project->created_at),
            'START' => ProjectsReportCSV::convertDateTime($project->start),
            'END' => ProjectsReportCSV::convertDateTime($project->end),
            'COSTS' => $project->costs / 100,
            'STATE' => ProjectsReportCSV::castState($project->state)
        ];
    }

    private static function convertDateTime($value)
    {
        return $value ? (new \DateTime($value))->format('d.m.Y') : '';
    }

    private static function castState($value)
    {
        switch ($value) {
            case EProjectState::SUBMITTED:
                return 'Eingereicht';
            case EProjectState::APPROVED:
                return 'Genehmigt';
            case EProjectState::REJECTED:
                return 'Abgelehnt';
        }
    }
}
