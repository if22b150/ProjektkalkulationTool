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

            'lecturers' => ['present', 'array'],
            'lecturers.*.id' => ['required', 'integer', 'exists:lecturers,id'],
            'lecturers.*.hours' => ['required', 'integer'],

            'expenses' => ['present', 'array'],
            'expenses.*.id' => ['required', 'integer', 'exists:expenses,id'],
            'expenses.*.costs' => ['required', 'integer']
        ];
    }
}
