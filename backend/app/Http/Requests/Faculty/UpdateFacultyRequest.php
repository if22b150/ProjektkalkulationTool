<?php

namespace App\Http\Requests\Faculty;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFacultyRequest extends FormRequest
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
        $faculty = $this->route('faculty');
        $this->merge(['id' => $this->route('faculty')]);

        return [
            'name' => ['required', 'string', Rule::unique('faculties', 'name')->ignore($faculty)]
        ];
    }
}
