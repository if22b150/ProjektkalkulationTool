<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GroupSpecificExpenseResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'costs' => $this->costs / 100,
            'perParticipant' => $this->per_participant
        ];
    }
}
