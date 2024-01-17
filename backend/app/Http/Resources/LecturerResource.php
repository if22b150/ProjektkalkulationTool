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
            'hourlyRate' => $this->hourly_rate,
            'dailyRate' => $this->daily_rate
        ];
    }
}
