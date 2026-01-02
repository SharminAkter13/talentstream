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

// App\Models\Application.php

public function candidate() {
    return $this->belongsTo(Candidate::class, 'candidate_id');
}



public function job() {
    return $this->belongsTo(Job::class, 'job_id');
} 

public function employer()
{
    return $this->hasOneThrough(
        Employer::class,    // The final model we want
        Job::class,         // The intermediate model (the bridge)
        'id',               // Foreign key on jobs table (jobs.id)
        'id',               // Foreign key on employers table (employers.id)
        'job_id',           // Local key on applications table
        'employer_id'       // Local key on jobs table
    );
}}