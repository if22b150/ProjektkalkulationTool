<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtherExpense extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'costs',
        'project_id'
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }
}
