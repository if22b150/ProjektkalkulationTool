<?php

namespace App\Utils;

use App\Enums\EProjectState;
use App\Models\Project;

class ProjectToCSV {
    public static function getProjectCSVString(Project $project, bool $isAdmin)
    {
        $csv = fopen('php://temp', 'w+');

        if ($csv === false) {
            throw new \Exception('Failed to open php://temp');
        }

        $isCourse = $project->projectType->is_course;

        $separator = ';';
        fwrite($csv, "\xEF\xBB\xBF"); // begin CSV with BOM

        // Details
        fputcsv($csv, $isCourse ? ProjectToCSV::getCourseDetailsCSVKeys($isAdmin) : ProjectToCSV::getDetailsCSVKeys(), $separator);
        fputcsv($csv, $isCourse ? ProjectToCSV::createCourseDetailsCSVArray($project, $isAdmin) : ProjectToCSV::createDetailsCSVArray($project), $separator);

        // Empty line
        fputcsv($csv, [], $separator);

        // Empty line
        fputcsv($csv, ['LECTURERS'], $separator);

        // Lecturers
        fputcsv($csv, ProjectToCSV::getLecturersCSVKeys($isAdmin), $separator);
        foreach ($project->lecturers as $projectLecturer) {
            fputcsv($csv, ProjectToCSV::createLecturerCSVArray($projectLecturer, $isAdmin), $separator);
        }

        // Empty line
        fputcsv($csv, [], $separator);

        // Empty line
        fputcsv($csv, ['EXPENSES'], $separator);

        // Expenses
        fputcsv($csv, ProjectToCSV::getExpensesCSVKeys(), $separator);
        foreach ($project->expenses as $projectExpense) {
            fputcsv($csv, ProjectToCSV::createExpenseCSVArray($projectExpense), $separator);
        }

        // Empty line
        fputcsv($csv, [], $separator);

        if($isAdmin) {
            // Empty line
            fputcsv($csv, ['OTHER EXPENSES'], $separator);
            // Other Expenses
            fputcsv($csv, ProjectToCSV::getOtherExpensesCSVKeys(), $separator);
            foreach ($project->otherExpenses as $otherExpense) {
                fputcsv($csv, ProjectToCSV::createOtherExpensesCSVArray($otherExpense, $project->participants ?? 1), $separator);
            }
            // Empty line
            fputcsv($csv, [], $separator);
            // Empty line
            fputcsv($csv, ['GROUP SPECIFIC EXPENSES'], $separator);
            // Group Specific Expenses
            fputcsv($csv, ProjectToCSV::getOtherExpensesCSVKeys(), $separator);
            foreach ($project->groupSpecificExpenses as $groupSpecificExpenses) {
                fputcsv($csv, ProjectToCSV::createGroupSpecificExpensesCSVArray($groupSpecificExpenses, $project->participants ?? 1), $separator);
            }
        }

        rewind($csv);
        return stream_get_contents($csv);
    }

    private static function getCourseDetailsCSVKeys($isAdmin): array
    {
        $r = [
            'ID', 'COMPANY', 'NAME', 'FACULTY', 'TYPE', 'START', 'END', 'FIRSTNAME', 'LASTNAME', 'EMAIL', 'CROSS_FACULTY', 'TOTAL_COSTS', 'NOTES', 'DURATION', 'CREATED_AT', 'STATE', 'PARTICIPANTS', 'ECTS'
        ];
        if($isAdmin)
            $r[] = 'PRICE_PER_DAY';
        return $r;
    }

    private static function getDetailsCSVKeys(): array
    {
        return [
            'ID', 'COMPANY', 'NAME', 'FACULTY', 'TYPE', 'START', 'END', 'FIRSTNAME', 'LASTNAME', 'EMAIL', 'CROSS_FACULTY', 'TOTAL_COSTS', 'NOTES', 'DURATION', 'CREATED_AT', 'STATE'
        ];
    }

    private static function getLecturersCSVKeys(bool $isAdmin): array
    {
        $keys = [
            'FACULTY',
            'LECTURER',
        ];

        if ($isAdmin) {
            $keys[] = 'HOURLY_RATE';
            $keys[] = 'DAILY_RATE';
        }

        $keys = array_merge($keys, [
            'HOURS',
            'DAYS',
            'COSTS',
        ]);

        return $keys;
    }


    private static function getExpensesCSVKeys(): array
    {
        // Define the keys/columns for the CSV Lecturer array
        return [
            'EXPENSE', 'COSTS'
        ];
    }

    private static function getOtherExpensesCSVKeys(): array
    {
        // Define the keys/columns for the CSV Lecturer array
        return [
            'EXPENSE', 'PER_PARTICIPANT', 'COSTS'
        ];
    }

    private static function createCourseDetailsCSVArray(Project $project, $isAdmin): array
    {
        $r = [
            'ID' => $project->id,
            'COMPANY' => $project->company->name,
            'NAME' => $project->name,
            'FACULTY' => $project->faculty->name,
            'TYPE' => $project->projectType->name,
            'START' => ProjectToCSV::convertDateTime($project->start),
            'END' => ProjectToCSV::convertDateTime($project->end),
            'FIRSTNAME' => $project->firstname,
            'LASTNAME' => $project->lastname,
            'EMAIL' => $project->email,
            'CROSS_FACULTY' => $project->cross_faculty ? 'Ja' : 'Nein',
            'TOTAL_COSTS' => $project->costs / 100,
            'NOTES' => $project->notes,
            'DURATION' => $project->duration,
            'CREATED_AT' => ProjectToCSV::convertDateTime($project->created_at),
            'STATE' => ProjectToCSV::castState($project->state),
            'PARTICIPANTS' => $project->participants,
            'ECTS' => $project->ects
        ];
        if($isAdmin)
            $r['PRICE_PER_DAY'] = ($project->price_for_course_per_day_override ?? $project->faculty->price_for_course_per_day) / 100;
        return $r;
    }

    private static function createDetailsCSVArray(Project $project): array
    {
        return [
            'ID' => $project->id,
            'COMPANY' => $project->company->name,
            'NAME' => $project->name,
            'FACULTY' => $project->faculty->name,
            'TYPE' => $project->projectType->name,
            'START' => ProjectToCSV::convertDateTime($project->start),
            'END' => ProjectToCSV::convertDateTime($project->end),
            'FIRSTNAME' => $project->firstname,
            'LASTNAME' => $project->lastname,
            'EMAIL' => $project->email,
            'CROSS_FACULTY' => $project->cross_faculty ? 'Ja' : 'Nein',
            'TOTAL_COSTS' => $project->costs / 100,
            'NOTES' => $project->notes,
            'DURATION' => $project->duration,
            'CREATED_AT' => ProjectToCSV::convertDateTime($project->created_at),
            'STATE' => ProjectToCSV::castState($project->state)
        ];
    }

    private static function createLecturerCSVArray($projectLecturer, bool $isAdmin): array
    {
        $lecturerArray = [
            'FACULTY' => $projectLecturer->lecturer->faculty->name,
            'LECTURER' => $projectLecturer->lecturer->name,
        ];

        if ($isAdmin) {
            $lecturerArray['HOURLY_RATE'] = ($projectLecturer->hourly_rate_override ?? $projectLecturer->lecturer->hourly_rate) / 100;
            $lecturerArray['DAILY_RATE'] = ($projectLecturer->daily_rate_override ?? $projectLecturer->lecturer->daily_rate) / 100;
        }

        $lecturerArray['HOURS'] = $projectLecturer->daily ? null : $projectLecturer->hours;
        $lecturerArray['DAYS'] = $projectLecturer->daily ? $projectLecturer->hours : null;
        $lecturerArray['COSTS'] = ProjectToCSV::calculateProjectLecturerCosts($projectLecturer);

        return $lecturerArray;
    }



    private static function createExpenseCSVArray($projectExpense): array
    {
        return [
            'EXPENSE' => $projectExpense->expense->name,
            'COSTS' => $projectExpense->costs / 100
        ];
    }

    private static function createOtherExpensesCSVArray($otherExpense, $participants): array
    {
        return [
            'EXPENSE' => $otherExpense->name,
            'PER_PARTICIPANT' => $otherExpense->per_participant ? 'Ja' : 'Nein',
            'COSTS' => $otherExpense->costs * ($otherExpense->per_participant ? $participants : 1) / 100
        ];
    }

    private static function createGroupSpecificExpensesCSVArray($groupSpecificExpense, $participants): array
    {
        return [
            'EXPENSE' => $groupSpecificExpense->name,
            'PER_PARTICIPANT' => $groupSpecificExpense->per_participant ? 'Ja' : 'Nein',
            'COSTS' => $groupSpecificExpense->costs * ($groupSpecificExpense->per_participant ? $participants : 1) / 100
        ];
    }

    public static function calculateProjectLecturerCosts($projectLecturer): int
    {
        return $projectLecturer->hours * ($projectLecturer->daily ? ($projectLecturer->daily_rate_override ?? $projectLecturer->lecturer->daily_rate) : ($projectLecturer->hourly_rate_override ?? $projectLecturer->lecturer->hourly_rate)) / 100;
    }

    private static function convertDateTime($value)
    {
        return (new \DateTime($value))->format('d.m.Y');
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
