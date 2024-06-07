<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'costs',
        'project_type_id',
        'user_id',
        'faculty_id',
        'firstname',
        'lastname',
        'email',
        'start',
        'end',
        'cross_faculty',
        'notes',
        'participants',
        'duration',
        'is_opened',
        'contribution_margin_1',
        'contribution_margin_2'
    ];

    protected $casts = [
        'start' => 'datetime:Y-m-d',
        'end' => 'datetime:Y-m-d',
        'cross_faculty' => 'boolean'
    ];

    public function projectType() {
        return $this->belongsTo(ProjectType::class, 'project_type_id');
    }
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function faculty() {
        return $this->belongsTo(Faculty::class, 'faculty_id');
    }
    public function lecturers() {
        return $this->hasMany(ProjectLecturer::class, 'project_id', 'id');
    }
    public function expenses() {
        return $this->hasMany(ProjectExpense::class, 'project_id', 'id');
    }
    public function faculties() {
        return $this->hasMany(ProjectFaculty::class, 'project_id', 'id');
    }
}
