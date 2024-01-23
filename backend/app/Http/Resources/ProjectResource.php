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
            'projectType' => new ProjectTypeResource($this->projectType),
            'userId' => $this->user->id,
            'facultyId' => $this->faculty->id,
            'lecturers' => ProjectLecturerResource::collection($this->lecturers),
            'expenses' => ProjectExpenseResource::collection($this->expenses)
        ];
    }
}
