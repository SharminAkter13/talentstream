<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough; // Import HasManyThrough

class Employer extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','name', 'company_name', 'website', 'phone', 'address'];

    /**
     * Get the User account associated with the Employer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the Employer Packages purchased by the Employer.
     */
    public function employerPackages(): HasMany
    {
        return $this->hasMany(EmployerPackage::class);
    }

    /**
     * Get the Jobs posted by the Employer.
     */
    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    /**
     * Get the Company details associated with the Employer.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get all Applications submitted for the Employer's jobs.
     * This uses a HasManyThrough relationship via the Job model.
     * Path: Employer -> Job -> Application
     */
    public function applications(): HasManyThrough
    {
        return $this->hasManyThrough(
            Application::class, // The final model we wish to access
            Job::class,         // The intermediate model
            'employer_id',      // Foreign key on the intermediate table (jobs)
            'job_id',           // Foreign key on the final table (applications)
            'id',               // Local key on the employers table
            'id'                // Local key on the jobs table
        );
    }
}