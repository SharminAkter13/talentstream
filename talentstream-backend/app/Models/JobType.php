<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobType extends Model
{
    protected $fillable = ['name', 'description', 'is_active'];
    
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}