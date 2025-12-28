<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Job extends Model
{
    // Fillable properties to allow mass assignment
    protected $fillable = [
        'user_email',
        'employer_id',
        'company_name',
        'website',
        'title',
        'category_id',
        'job_location_id',
        'job_type_id',
        'tags',
        'description',
        'application_email',
        'application_url',
        'closing_date',
        'tagline',
        'cover_image',
        'status',
    ];

    // Casts properties to specific types
    protected $casts = [
        'closing_date' => 'date',
    ];

    // Scope for active jobs
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
        return $this->belongsTo(JobLocation::class);
    }

    public function jobType()
    {
        return $this->belongsTo(JobType::class);
    }

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employer_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'job_id');
    }

    // Method to fetch job with applications
    public function getJobWithApplications($jobId)
    {
        return $this->with('applications')->findOrFail($jobId);
    }

    // Method to fetch job with related details
    public function getJobWithDetails($jobId)
    {
        return $this->with(['category', 'jobLocation', 'jobType'])->findOrFail($jobId);
    }
}
