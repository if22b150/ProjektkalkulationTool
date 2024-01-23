<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectLecturerResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project->id,
            'lecturer' => new LecturerResource($this->lecturer),
            'hours' => $this->hours
        ];
    }
}
