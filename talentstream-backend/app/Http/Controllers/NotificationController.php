<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NotificationController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // All notification actions require an authenticated user
        $this->middleware('auth');
    }

    /**
     * Display all notifications for the logged-in user, with pagination.
     */
    public function index()
    {
        $notifications = Notification::where('user_id', Auth::id())
            ->latest()
            ->paginate(20); // Use pagination for large datasets

        return view('pages.notifications.index', compact('notifications'));
    }

    /**
     * Mark a single notification as read.
     * Use Route Model Binding if applicable, otherwise $id parameter is fine.
     */
    public function markAsRead($id)
    {
        // Ensure the user can only mark their own notification as read
        $notification = Notification::where('user_id', Auth::id())
            ->where('id', $id) // Added explicit ID check for clarity with findOrFail
            ->findOrFail($id);

        $notification->update(['is_read' => true]);

        // Return a JSON response for API/AJAX usage
        return response()->json(['status' => 'success', 'message' => 'Notification marked as read.']);
    }

    /**
     * Mark all unread notifications for the user as read.
     */
    public function markAllAsRead()
    {
        Notification::where('user_id', Auth::id())
            ->where('is_read', false) // Only update unread notifications for efficiency
            ->update(['is_read' => true]);

        // Return a JSON response for API/AJAX usage
        return response()->json(['status' => 'success', 'message' => 'All unread notifications marked as read.']);
    }

    /**
     * Delete a notification.
     */
    public function destroy($id)
    {
        // Ensure the user can only delete their own notification
        $notification = Notification::where('user_id', Auth::id())
            ->where('id', $id)
            ->findOrFail($id);

        $notification->delete();

        // Return a JSON response for API/AJAX usage
        return response()->json(['status' => 'success', 'message' => 'Notification deleted.']);
    }

    /**
     * Get the count of unread notifications for the user (for dashboard/nav badge).
     */
    public function unreadCount()
    {
        $unreadCount = Notification::where('user_id', Auth::id())
            ->where('is_read', false)
            ->count();

        return response()->json(['unread_count' => $unreadCount]);
    }
}