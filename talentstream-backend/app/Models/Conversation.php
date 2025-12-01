<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['user_one', 'user_two'];

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // ✅ Helper: get the other participant
    public function otherUser($authId)
    {
        return $this->user_one == $authId ? $this->userTwo : $this->userOne;
    }
}