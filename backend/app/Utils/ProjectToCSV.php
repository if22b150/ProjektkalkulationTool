<?php

namespace App\Utils;

use App\Models\Project;

class ProjectToCSV {
    public static function getProjectCSVString(Project $project)
    {
        $csv = fopen('php://temp', 'w+');

        if ($csv === false) {
            throw new \Exception('Failed to open php://temp');
        }

        $separator = ';';
        fwrite($csv, "\xEF\xBB\xBF"); // begin CSV with BOM

        // Details
        fputcsv($csv, ProjectToCSV::getDetailsCSVKeys(), $separator);
        fputcsv($csv, ProjectToCSV::createDetailsCSVArray($project), $separator);

        // Empty line
        fputcsv($csv, [], $separator);

        // Lecturers
        fputcsv($csv, ProjectToCSV::getLecturersCSVKeys(), $separator);
        foreach ($project->lecturers as $projectLecturer) {
            fputcsv($csv, ProjectToCSV::createLecturerCSVArray($projectLecturer), $separator);
        }

        // Empty line
        fputcsv($csv, [], $separator);

        // Expenses
        fputcsv($csv, ProjectToCSV::getExpensesCSVKeys(), $separator);
        foreach ($project->expenses as $projectExpense) {
            fputcsv($csv, ProjectToCSV::createExpenseCSVArray($projectExpense), $separator);
        }

        rewind($csv);
        return stream_get_contents($csv);
    }

    private static function getDetailsCSVKeys(): array
    {
        return [
            'ID', 'COMPANY', 'NAME', 'FACULTY', 'TYPE', 'ECTS', 'START', 'END', 'FIRSTNAME', 'LASTNAME', 'EMAIL', 'CROSS_FACULTY', 'TOTAL_COSTS'
        ];
    }

    private static function getLecturersCSVKeys(): array
    {
        // Define the keys/columns for the CSV Lecturer array
        return [
            'FACULTY', 'LECTURER', 'HOURLY_RATE', 'DAILY_RATE', 'HOURS', 'LECTURER_COSTS'
        ];
    }

    private static function getExpensesCSVKeys(): array
    {
        // Define the keys/columns for the CSV Lecturer array
        return [
            'EXPENSE', 'COSTS'
        ];
    }

    private static function createDetailsCSVArray(Project $project): array
    {
        return [
            'ID' => $project->id,
            'COMPANY' => $project->company->name,
            'NAME' => $project->name,
            'FACULTY' => $project->faculty->name,
            'TYPE' => $project->projectType->name,
            'ECTS' => $project->ects,
            'START' => ProjectToCSV::convertDateTime($project->start),
            'END' => ProjectToCSV::convertDateTime($project->end),
            'FIRSTNAME' => $project->firstname,
            'LASTNAME' => $project->lastname,
            'EMAIL' => $project->email,
            'CROSS_FACULTY' => $project->cross_faculty ? 'Ja' : 'Nein',
            'TOTAL_COSTS' => $project->costs / 100
        ];
    }

    private static function createLecturerCSVArray($projectLecturer): array
    {
        return [
            'FACULTY' => $projectLecturer->lecturer->faculty->name,
            'LECTURER' => $projectLecturer->lecturer->name,
            'HOURLY_RATE' => $projectLecturer->lecturer->hourly_rate,
            'DAILY_RATE' => $projectLecturer->lecturer->daily_rate,
            'HOURS' => $projectLecturer->hours,
            'LECTURER_COSTS' => ProjectToCSV::calculateProjectLecturerCosts($projectLecturer)
        ];
    }

    private static function createExpenseCSVArray($projectExpense): array
    {
        return [
            'EXPENSE' => $projectExpense->expense->name,
            'COSTS' => $projectExpense->costs
        ];
    }

    private static function calculateProjectLecturerCosts($projectLecturer): int
    {
        return $projectLecturer->hours * $projectLecturer->lecturer->hourly_rate;
    }

    private static function convertDateTime($value)
    {
        return (new \DateTime($value))->format('d.m.Y');
    }
}
