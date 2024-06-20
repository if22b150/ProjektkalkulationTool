<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectLecturer extends Model
{
    protected $table = 'project_lecturer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'lecturer_id',
        'hours',
        'daily',
        'hourly_rate_override',
        'daily_rate_override'
    ];

    protected $casts = [
        'daily' => 'boolean'
    ];

    public function project() {
        return $this->belongsTo(Project::class, 'project_id');
    }
    public function lecturer() {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
