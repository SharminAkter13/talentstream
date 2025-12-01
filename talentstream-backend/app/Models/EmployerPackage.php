<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployerPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'package_id',
        'start_date',
        'end_date',
        'status',
    ];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}