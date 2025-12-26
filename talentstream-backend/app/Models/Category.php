<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  protected $fillable = [
    'name', 
    'image_path', 
    'is_active', 
    'sort_order', 
   
];
public function scopeActive(Builder $query)
    {
        return $query->where('status', 'active'); // or where('is_active', true)
    }

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}