<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Fetch chat contacts based on user role.
     */
    public function getContacts()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([], 200);
        }

        $contacts = User::where('id', '!=', $user->id)
            ->when($user->role_id == 2, fn ($q) => $q->where('role_id', 3)) // Employer → Candidate
            ->when($user->role_id == 3, fn ($q) => $q->where('role_id', 2)) // Candidate → Employer
            ->select('id', 'name', 'role_id')
            ->get();

        foreach ($contacts as $contact) {
            $conversation = Conversation::where(function ($q) use ($user, $contact) {
                $q->where('user_one', $user->id)
                  ->where('user_two', $contact->id);
            })->orWhere(function ($q) use ($user, $contact) {
                $q->where('user_one', $contact->id)
                  ->where('user_two', $user->id);
            })->first();

            $contact->unread_count = $conversation
                ? Message::where('conversation_id', $conversation->id)
                    ->where('sender_id', '!=', $user->id)
                    ->where('is_read', false)
                    ->count()
                : 0;
        }

        return response()->json($contacts);
    }

    /**
     * Retrieve messages between authenticated user and another user.
     */
    public function getMessages($otherUserId)
    {
        $currentUserId = Auth::id();

        if (!$currentUserId) {
            return response()->json([
                'conversation_id' => null,
                'messages' => [],
            ]);
        }

        $conversation = Conversation::where(function ($q) use ($currentUserId, $otherUserId) {
            $q->where('user_one', $currentUserId)
              ->where('user_two', $otherUserId);
        })->orWhere(function ($q) use ($currentUserId, $otherUserId) {
            $q->where('user_one', $otherUserId)
              ->where('user_two', $currentUserId);
        })->first();

        if (!$conversation) {
            return response()->json([
                'conversation_id' => null,
                'messages' => [],
            ]);
        }

        $messages = $conversation->messages()
            ->with('sender:id,name')
            ->orderBy('created_at')
            ->get();

        // Mark received messages as read
        Message::where('conversation_id', $conversation->id)
            ->where('sender_id', '!=', $currentUserId)
            ->update(['is_read' => true]);

        return response()->json([
            'conversation_id' => $conversation->id,
            'messages' => $messages,
        ]);
    }

    /**
     * Send a new message.
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'text' => 'required|string|max:1000',
        ]);

        $currentUserId = Auth::id();

        if (!$currentUserId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $conversation = Conversation::where(function ($q) use ($currentUserId, $request) {
            $q->where('user_one', $currentUserId)
              ->where('user_two', $request->receiver_id);
        })->orWhere(function ($q) use ($currentUserId, $request) {
            $q->where('user_one', $request->receiver_id)
              ->where('user_two', $currentUserId);
        })->first();

        if (!$conversation) {
            $ids = [$currentUserId, $request->receiver_id];
            sort($ids);

            $conversation = Conversation::create([
                'user_one' => $ids[0],
                'user_two' => $ids[1],
            ]);
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $currentUserId,
            'message' => $request->text,
            'is_read' => false,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => $message->load('sender:id,name'),
        ]);
    }
}
