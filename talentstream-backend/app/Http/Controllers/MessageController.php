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
use Exception;

class MessageController extends Controller
{
    
    /**
     * Get list of contacts with last message and unread count
     */
    public function getContacts()
    {
        try {
            $user = Auth::user();

            // 1. Get potential contacts based on opposite roles
            // Employer (Role 2) sees Candidates (Role 3)
            // Candidate (Role 3) sees Employers (Role 2)
            $contacts = User::where('id', '!=', $user->id)
                ->when($user->role_id == 2, fn ($q) => $q->where('role_id', 3))
                ->when($user->role_id == 3, fn ($q) => $q->where('role_id', 2))
                ->select('id', 'name', 'role_id')
                ->get();

            foreach ($contacts as $contact) {
                // 2. Find conversation between current user and this contact
                $conversation = Conversation::where(function ($q) use ($user, $contact) {
                    $q->where('user_one', $user->id)->where('user_two', $contact->id);
                })->orWhere(function ($q) use ($user, $contact) {
                    $q->where('user_one', $contact->id)->where('user_two', $user->id);
                })->first();

                if ($conversation) {
                    $contact->conversation_id = $conversation->id;

                    // 3. Count unread messages sent by the contact to current user
                    $contact->unread_count = Message::where('conversation_id', $conversation->id)
                        ->where('sender_id', $contact->id)
                        ->where('is_read', false)
                        ->count();

                    // 4. Get the latest message text
                    $lastMsg = Message::where('conversation_id', $conversation->id)
                        ->latest()
                        ->first();
                    
                    $contact->last_message = $lastMsg ? $lastMsg->message : 'No messages yet';
                    $contact->last_message_time = $lastMsg ? $lastMsg->created_at->diffForHumans() : '';
                } else {
                    $contact->conversation_id = null;
                    $contact->unread_count = 0;
                    $contact->last_message = 'Start a conversation';
                    $contact->last_message_time = '';
                }
            }

            return response()->json($contacts);

        } catch (Exception $e) {
            // Return actual error to help you debug 500 errors
            return response()->json([
                'error' => 'Server Error',
                'message' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    /**
     * Get messages for a specific user chat
     */
    public function getMessages($otherUserId)
    {
        try {
            $currentUserId = Auth::id();

            $conversation = Conversation::where(function ($q) use ($currentUserId, $otherUserId) {
                $q->where('user_one', $currentUserId)->where('user_two', $otherUserId);
            })->orWhere(function ($q) use ($currentUserId, $otherUserId) {
                $q->where('user_one', $otherUserId)->where('user_two', $currentUserId);
            })->first();

            if (!$conversation) {
                return response()->json(['conversation_id' => null, 'messages' => []]);
            }

            // Requires 'messages' relationship in Conversation Model
            $messages = $conversation->messages()
                ->with('sender:id,name')
                ->orderBy('created_at', 'asc')
                ->get();

            return response()->json([
                'conversation_id' => $conversation->id,
                'messages' => $messages,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Send a message and trigger Reverb/Pusher Broadcast
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'text' => 'required|string',
        ]);

        try {
            $currentUserId = Auth::id();
            $receiverId = $request->receiver_id;

            // 1. Find or Create Conversation
            $conversation = Conversation::where(function ($q) use ($currentUserId, $receiverId) {
                $q->where('user_one', $currentUserId)->where('user_two', $receiverId);
            })->orWhere(function ($q) use ($currentUserId, $receiverId) {
                $q->where('user_one', $receiverId)->where('user_two', $currentUserId);
            })->first();

            if (!$conversation) {
                // Ensure user_one is always the smaller ID for consistency
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

            // Load sender for frontend display
            $fullMessage = $message->load('sender:id,name');

            // 3. BROADCAST: Real-time event
            broadcast(new MessageSent($fullMessage))->toOthers();

            return response()->json(['status' => 'success', 'message' => $fullMessage]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Mark messages as read
     */
    public function markAsSeen(Request $request)
    {
        $request->validate(['conversation_id' => 'required|exists:conversations,id']);
        
        try {
            $userId = Auth::id();
            $conversationId = $request->conversation_id;

            Message::where('conversation_id', $conversationId)
                ->where('sender_id', '!=', $userId)
                ->where('is_read', false)
                ->update(['is_read' => true]);

            broadcast(new ChatSeen($conversationId, $userId))->toOthers();

            return response()->json(['status' => 'success']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}