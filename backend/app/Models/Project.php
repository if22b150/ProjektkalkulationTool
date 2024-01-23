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
        'faculty_id'
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
        return $this->belongsToMany(Lecturer::class, 'project_lecturer', 'project_id', 'lecturer_id')
            ->using(ProjectLecturer::class)
            ->withPivot(['hours']);
    }
    public function expenses() {
        return $this->belongsToMany(Expense::class, 'project_expense', 'project_id', 'expense_id')
            ->using(ProjectExpense::class)
            ->withPivot(['costs']);
    }
}
