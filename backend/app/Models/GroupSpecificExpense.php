<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class GroupSpecificExpense extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'costs',
        'per_participant',
        'project_id'
    ];

    protected $casts = [
        'per_participant' => 'boolean',
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }
}
