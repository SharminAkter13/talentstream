<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'user_email','employer_id', 'company_name', 'website',
        'title', 'job_location_id', 'job_type_id', 'category_id', 'tags',
        'description', 'application_email', 'application_url',
        'closing_date', 'tagline', 'cover_image', 'status'
    ];

    protected $casts = [
        'closing_date' => 'date',
    ];
    public function scopeActive(Builder $query)
    {
        return $query->where('status', 'active');
    }

    // Relations
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function jobLocation()
    {
        return $this->belongsTo(JobLocation::class, 'job_location_id');
    }

    public function jobType()
    {
        return $this->belongsTo(JobType::class, 'job_type_id');
    }

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employer_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'job_id');
    }
}