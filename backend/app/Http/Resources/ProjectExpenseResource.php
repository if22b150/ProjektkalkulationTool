<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectExpenseResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'projectId' => $this->project_id,
            'expense' => new ExpenseResource($this->expense),
            'costs' => $this->costs
        ];
    }
}
