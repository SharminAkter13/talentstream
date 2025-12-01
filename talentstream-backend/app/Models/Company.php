<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * This prevents MassAssignmentExceptions when using create() or update().
     * The primary key 'id' and timestamps are managed automatically.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'industry',
        'description',
        'website',
        'address',
        'contact_email',
        'contact_phone',
        'logo',
        'established_year',
        'size',
    ];

    public function employers()
    {
        return $this->hasMany(Employer::class, 'company_id');
    }
}