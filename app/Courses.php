<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    protected $fillable = [
        'id', 'name', 'description', 'lesson', 'teachers', 'owner',
    ];
    protected $casts = [
        'lesson' => 'array',
        'teachers' => 'array'
    ];
}
