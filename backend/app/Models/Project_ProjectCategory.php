<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Project_ProjectCategory extends Model
{
    protected $table = 'project_projectCategory';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'project_category_id',
        'costs'
    ];

    public function project() {
        return $this->belongsTo(Project::class, 'project_id');
    }
    public function expense() {
        return $this->belongsTo(Expense::class, 'project_category_id');
    }
}
