<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    protected $fillable = ['user_id','name','resume', 'phone', 'address'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
    public function application()
    {
        return $this->hasMany(application::class);
    }

    public function resume()
    {
        return $this->belongsTo(Resume::class);
    }
}