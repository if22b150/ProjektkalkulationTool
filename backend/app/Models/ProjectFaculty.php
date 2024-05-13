<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectFaculty extends Model
{
    protected $table = 'project_faculty';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'faculty_id'
    ];

    public function project() {
        return $this->belongsTo(Project::class, 'project_id');
    }
    public function faculty() {
        return $this->belongsTo(Faculty::class, 'faculty_id');
    }
}
