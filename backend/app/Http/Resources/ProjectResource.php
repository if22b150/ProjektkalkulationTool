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
            'projectType' => new ProjectTypeResource($this->projectType),
            'user_id' => $this->user->id,
            'faculty_id' => $this->faculty->id,
            'lecturers' => ProjectLecturerResource::collection($this->lecturers),
            'expenses' => ProjectExpenseResource::collection($this->expenses)
        ];
    }
}
