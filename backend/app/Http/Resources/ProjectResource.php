<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'costs' => $this->costs/100,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'start' => $this->start->format('Y-m-d'),
            'end' => $this->end->format('Y-m-d'),
            'notes' => $this->notes,
            'participants' => $this->participants,
            'duration' => $this->duration,
            'crossFaculty' => $this->cross_faculty,
            'userId' => $this->user->id,
            'faculty' => new FacultyResource($this->faculty),
            'projectType' => new ProjectTypeResource($this->projectType),
            'lecturers' => ProjectLecturerResource::collection($this->lecturers),
            'expenses' => ProjectExpenseResource::collection($this->expenses),
            'crossFaculties' => $this->faculties->map(function ($item, int $key) {
                return $item->faculty;
            })
        ];
    }
}
