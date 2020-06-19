<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quizs extends Model
{
    protected $fillable = [
        'id', 'name', 'time', 'quest', 'owner', 'description'
    ];

    protected $casts = [
        'quest' => 'array'
    ];
}
