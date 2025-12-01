<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobView extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'user_id',
        'viewed_at',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function viewer()
    {
        return $this->belongsTo(User::class);
    }
}