<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'name' => ['required', 'string'],
            'costs' => ['required', 'integer'],
            'projectTypeId' => ['required', 'integer', 'exists:project_types,id'],
            'companyId' => ['required', 'integer', 'exists:companies,id'],
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'email'],
            'start' => ['required', 'string'],
            'end' => ['required', 'string'],
            'crossFaculty' => ['required', 'boolean'],
            'notes' => ['nullable', 'string'],
            'participants' => ['nullable', 'integer'],
            'duration' => ['nullable', 'integer'],
            'ects' => ['nullable', 'integer'],
            'is_opened' => ['nullable', 'boolean'],
            'priceForCoursePerDayOverride' => ['nullable', 'integer'],
            'lecturers' => ['present', 'array'],
            'lecturers.*.id' => ['required', 'integer', 'exists:lecturers,id'],
            'lecturers.*.hours' => ['required', 'integer'],
            'lecturers.*.daily' => ['required', 'boolean'],
            'lecturers.*.hourlyRateOverride' => ['nullable', 'integer'],
            'lecturers.*.dailyRateOverride' => ['nullable', 'integer'],

            'expenses' => ['present', 'array'],
            'expenses.*.id' => ['required', 'integer', 'exists:expenses,id'],
            'expenses.*.costs' => ['required', 'integer'],

            'otherExpenses' => ['nullable', 'array'],
            'otherExpenses.*.id' => ['nullable', 'integer'],
            'otherExpenses.*.costs' => ['required', 'integer'],
            'otherExpenses.*.name' => ['required', 'string'],
            'otherExpenses.*.perParticipant' => ['required', 'boolean'],

            'groupSpecificExpenses' => ['nullable', 'array'],
            'groupSpecificExpenses.*.id' => ['nullable', 'integer'],
            'groupSpecificExpenses.*.costs' => ['required', 'integer'],
            'groupSpecificExpenses.*.name' => ['required', 'string'],
            'groupSpecificExpenses.*.perParticipant' => ['required', 'boolean'],

            'crossFaculties' => ['present', 'array'],
            'crossFaculties.*.id' => ['required', 'integer', 'exists:faculties,id'],
        ];
    }
}
