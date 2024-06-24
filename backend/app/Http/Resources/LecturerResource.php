<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LecturerResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'hourlyRate' => $this->hourly_rate / 100,
            'dailyRate' => $this->daily_rate / 100,
            'faculty' => new FacultyResource($this->faculty)
        ];
    }
}
