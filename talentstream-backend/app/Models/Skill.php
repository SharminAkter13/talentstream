<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Resume; // ✅ Add this line


class Skill extends Model
{
    use HasFactory;
    protected $table = 'skills';

    protected $fillable = ['resume_id', 'skill_name', 'skill_percent'];

    public function resume()
    {
        return $this->belongsTo(Resume::class);
    }
}