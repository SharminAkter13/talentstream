<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Skill;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'email', 'profession_title', 'location',
        'web', 'pre_hour', 'age', 'cover_image'
    ];

    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}