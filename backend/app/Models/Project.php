<?php

namespace App\Models;

use App\Enums\EProjectState;
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
        'company_id',
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
        'ects',
        'is_opened',
        'price_for_course_per_day_override',
        'state',
        'state_changed_at'
    ];

    protected $casts = [
        'start' => 'datetime:Y-m-d',
        'end' => 'datetime:Y-m-d',
        'cross_faculty' => 'boolean',
        'is_opened' => 'boolean',
        'state' => EProjectState::class,
        'state_changed_at' => 'datetime:Y-m-d H:i:s'
    ];

    public function projectType() {
        return $this->belongsTo(ProjectType::class, 'project_type_id');
    }

    public function company() {
        return $this->belongsTo(Company::class, 'company_id');
    }
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function faculty() {
        return $this->belongsTo(Faculty::class, 'faculty_id');
    }

    //public function company() {
    //    return $this->belongsTo(Company::class, 'company_id');
    //}
    public function lecturers() {
        return $this->hasMany(ProjectLecturer::class, 'project_id', 'id');
    }
    public function expenses() {
        return $this->hasMany(ProjectExpense::class, 'project_id', 'id');
    }
    public function faculties() {
        return $this->hasMany(ProjectFaculty::class, 'project_id', 'id');
    }
    public function otherExpenses()
    {
        return $this->hasMany(OtherExpense::class);
    }
    public function groupSpecificExpenses()
    {
        return $this->hasMany(GroupSpecificExpense::class);
    }
}
