<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{conversationId}', function ($user, $conversationId) {
    // Only allow the user if they are part of the conversation
    return Conversation::where('id', $conversationId)
        ->where(function($q) use ($user) {
            $q->where('user_one', $user->id)
              ->orWhere('user_two', $user->id);
        })->exists();
});