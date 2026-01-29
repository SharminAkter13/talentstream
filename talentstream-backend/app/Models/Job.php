<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Job extends Model
{
    // Fillable properties to allow mass assignment
protected $fillable = [
    'employer_id', 'company_id', 'category_id', 'job_type_id', 
    'job_skill_id', 'job_location_id', 'title', 'description', 
    'salary_min', 'salary_max', 'posted_date', 'application_deadline', 
    'num_vacancies', 'status', 'cover_image', 'company_name'
];
    // Casts properties to specific types
   protected $casts = [
    'application_deadline' => 'datetime',
    'posted_date' => 'datetime',
];

    // Scope for active jobs
    public function scopeActive(Builder $query)
    {
        return $query->where('status', 'active');
    }

    // Relations
   public function category()
{
    return $this->belongsTo(Category::class, 'category_id', 'id');
}

    public function jobLocation()
{
    return $this->belongsTo(JobLocation::class, 'job_location_id', 'id');
}
public function jobType()
{
    return $this->belongsTo(JobType::class, 'job_type_id', 'id');
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
