<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'country',
        'state',
        'city',
        'address',
        'postal_code',
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
    public function getAddressAndCityAttribute()
    {
        $parts = array_filter([
            $this->address,
            $this->city,
        ]);
        return implode(', ', $parts);
    }
}