<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectLecturerResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'projectId' => $this->project_id,
            'lecturer' => new LecturerResource($this->lecturer),
            'hours' => $this->hours,
            'daily' => $this->daily,
            'hourlyRateOverride' => $this->hourly_rate_override,
            'dailyRateOverride' => $this->daily_rate_override,
        ];
    }
}
