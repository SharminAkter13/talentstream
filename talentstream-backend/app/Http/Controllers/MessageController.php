<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSent;
use App\Events\ChatSeen;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Get list of contacts (Candidates for Employers, Employers for Candidates)
     */
    public function getContacts()
    {
        $user = Auth::user();

        // Find users the current user can chat with
        $contacts = User::where('id', '!=', $user->id)
            ->when($user->role_id == 2, fn ($q) => $q->where('role_id', 3)) // Employer sees Candidates
            ->when($user->role_id == 3, fn ($q) => $q->where('role_id', 2)) // Candidate sees Employers
            ->select('id', 'name', 'role_id')
            ->get();

        foreach ($contacts as $contact) {
            // Find conversation between these two users
            $conversation = Conversation::where(function ($q) use ($user, $contact) {
                $q->where('user_one', $user->id)->where('user_two', $contact->id);
            })->orWhere(function ($q) use ($user, $contact) {
                $q->where('user_one', $contact->id)->where('user_two', $user->id);
            })->first();

            // Count unread messages sent by the contact to the current user
            $contact->unread_count = $conversation
                ? Message::where('conversation_id', $conversation->id)
                    ->where('sender_id', $contact->id)
                    ->where('is_read', false)
                    ->count()
                : 0;

            // Get last message preview
            $contact->last_message = $conversation 
                ? Message::where('conversation_id', $conversation->id)->latest()->first() 
                : null;
        }

        return response()->json($contacts);
    }

    /**
     * Get messages for a specific conversation
     */
    public function getMessages($otherUserId)
    {
        $currentUserId = Auth::id();

        $conversation = Conversation::where(function ($q) use ($currentUserId, $otherUserId) {
            $q->where('user_one', $currentUserId)->where('user_two', $otherUserId);
        })->orWhere(function ($q) use ($currentUserId, $otherUserId) {
            $q->where('user_one', $otherUserId)->where('user_two', $currentUserId);
        })->first();

        if (!$conversation) {
            return response()->json(['conversation_id' => null, 'messages' => []]);
        }

        $messages = $conversation->messages()
            ->with('sender:id,name')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'conversation_id' => $conversation->id,
            'messages' => $messages,
        ]);
    }

    /**
     * Send a message and Broadcast
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'text' => 'required|string',
        ]);

        $currentUserId = Auth::id();
        $receiverId = $request->receiver_id;

        // 1. Find or Create Conversation
        $conversation = Conversation::where(function ($q) use ($currentUserId, $receiverId) {
            $q->where('user_one', $currentUserId)->where('user_two', $receiverId);
        })->orWhere(function ($q) use ($currentUserId, $receiverId) {
            $q->where('user_one', $receiverId)->where('user_two', $currentUserId);
        })->first();

        if (!$conversation) {
            $ids = [$currentUserId, $receiverId];
            sort($ids);
            $conversation = Conversation::create(['user_one' => $ids[0], 'user_two' => $ids[1]]);
        }

        // 2. Save Message
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $currentUserId,
            'message' => $request->text,
            'is_read' => false,
        ]);

        $fullMessage = $message->load('sender:id,name');

        // 3. BROADCAST: Send real-time event to the receiver
        broadcast(new MessageSent($fullMessage))->toOthers();

        return response()->json(['status' => 'success', 'message' => $fullMessage]);
    }

    /**
     * Mark conversation as seen
     */
    public function markAsSeen(Request $request)
    {
        $request->validate(['conversation_id' => 'required|exists:conversations,id']);
        
        $userId = Auth::id();
        $conversationId = $request->conversation_id;

        // Update all messages in this conversation NOT sent by me to 'is_read = true'
        Message::where('conversation_id', $conversationId)
            ->where('sender_id', '!=', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        // BROADCAST: Notify the sender that their messages were seen
        broadcast(new ChatSeen($conversationId, $userId))->toOthers();

        return response()->json(['status' => 'success']);
    }
}