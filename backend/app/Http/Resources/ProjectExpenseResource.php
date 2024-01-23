<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectExpenseResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project->id,
            'expense' => new ExpenseResource($this->expense),
            'costs' => $this->costs
        ];
    }
}
