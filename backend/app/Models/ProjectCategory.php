<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectCategory  extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name'
    ];

    public function projects() {
        return $this->belongsToMany(Project::class, 'project_projectCategory');
    }
}
