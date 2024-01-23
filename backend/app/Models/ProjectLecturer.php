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
        'hours'
    ];

    public function project() {
        return $this->belongsTo(Project::class, 'project_id');
    }
    public function lecturer() {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
