<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'candidate_id',
        'applied_date',
        'status',
        'resume', 
        'cover_letter',
    ];

    /**
     * Get the Job that the application belongs to.
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }


    /**
     * Get the Candidate (User) who submitted the application.
     */
    public function candidate()
    {
        // Assuming Candidate is a User with a specific role, or linked via a separate 'candidates' table.
        // Based on your current relationship structure, we link Application -> candidate_id -> User.
        return $this->belongsTo(User::class, 'candidate_id');
    }

    /**
     * Get the Employer associated with the Job for this application.
     * This uses a HasOneThrough relationship:
     * 1. Looks through the Job model.
     * 2. Finds the Employer model via the Job's employer_id.
     */
    public function employer()
    {
        // Path: Application -> Job -> Employer
        // The employer is related to the application through the job.
        return $this->hasOneThrough(
            Employer::class,    // The final model we wish to access
            Job::class,         // The intermediate model
            'id',               // Foreign key on the intermediate table (jobs.id)
            'id',               // Foreign key on the final table (employers.id) - assuming job.employer_id points to employers.id
            'job_id',           // Local key on the applications table
            'employer_id'       // Local key on the jobs table that links to the employer
        );
    }
}