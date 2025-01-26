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
            'costs' => $this->costs / 100,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'start' => $this->start->format('Y-m-d'),
            'end' => $this->end->format('Y-m-d'),
            'notes' => $this->notes,
            'participants' => $this->participants,
            'duration' => $this->duration,
            'ects' => $this->ects,
            'crossFaculty' => $this->cross_faculty,
            'userId' => $this->user->id,
            'isOpened' => $this->is_opened,
            'faculty' => new FacultyResource($this->faculty),
            'projectType' => new ProjectTypeResource($this->projectType),
            'company' => new CompanyResource($this->company),
            'state' => $this->state,
            'stateChangedAt' => $this->state_changed_at?->format('Y-m-d H:i:s'),
            'createdAt' => $this->created_at?->format('Y-m-d H:i:s'),
            'lecturers' => ProjectLecturerResource::collection($this->lecturers),
            'expenses' => ProjectExpenseResource::collection($this->expenses),
            'crossFaculties' => $this->faculties->map(function ($item, int $key) {
                return $item->faculty;
            }),
            'priceForCoursePerDayOverride' => $this->price_for_course_per_day_override ? $this->price_for_course_per_day_override / 100 : null,
            'otherExpenses' => OtherExpenseResource::collection($this->otherExpenses),
            'groupSpecificExpenses' => GroupSpecificExpenseResource::collection($this->groupSpecificExpenses)
        ];
    }
}
