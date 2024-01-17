<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecturer  extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'hourly_rate',
        'daily_rate'
    ];
}
