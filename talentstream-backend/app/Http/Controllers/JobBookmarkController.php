<?php

namespace App\Http\Controllers;

use App\Models\JobBookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * @mixin \Illuminate\Routing\Controller
 */
class JobBookmarkController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // Only authenticated users can manage bookmarks
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a paginated list of job bookmarks for the authenticated candidate.
     */
    public function index()
    {
        $user = Auth::user();

        // Ensure user has a candidate profile
        if (!$user->candidate) {
            return response()->json(['message' => 'Only candidates can access bookmarks.'], 403); // 403 Forbidden
        }

        $bookmarks = JobBookmark::with('job.employer') // Eager load relations for API
            ->where('candidate_id', $user->candidate->id)
            ->orderByDesc('saved_date')
            ->paginate(10); // Use pagination for API listing

        return response()->json([
            'bookmarks' => $bookmarks,
            'message' => 'Job bookmarks retrieved successfully.'
        ]);
    }

    /**
     * Store a new bookmark for the given job (expects job_id in request body).
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // 1. Authorization check
        if (!$user->candidate) {
            return response()->json(['message' => 'Only candidates can bookmark jobs.'], 403); // 403 Forbidden
        }

        // 2. Validation
        $request->validate([
            'job_id' => 'required|exists:jobs,id',
        ]);

        $jobId = $request->job_id;
        $candidateId = $user->candidate->id;

        // 3. Check for existing bookmark
        $existing = JobBookmark::where('candidate_id', $candidateId)
            ->where('job_id', $jobId)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Job already bookmarked.'
            ], 409); // 409 Conflict
        }

        // 4. Create new bookmark
        $bookmark = JobBookmark::create([
            'candidate_id' => $candidateId,
            'job_id' => $jobId,
            'saved_date' => now(),
        ]);

        return response()->json([
            'message' => 'Job bookmarked successfully!',
            'bookmark' => $bookmark
        ], 201); // 201 Created
    }

    /**
     * Remove the specified job bookmark from storage.
     * Uses route model binding: JobBookmark $jobBookmark
     */
    public function destroy(JobBookmark $jobBookmark)
    {
        $user = Auth::user();
        
        // Authorization check: Ensure the candidate owns this bookmark
        if (!$user->candidate || $jobBookmark->candidate_id !== $user->candidate->id) {
             // In a standard Laravel setup, this is typically handled by a policy/404, 
             // but we'll enforce a strict check here.
             return response()->json(['message' => 'Unauthorized action or bookmark not found.'], 403);
        }
        
        $jobBookmark->delete();

        // Converted from redirect to JSON
        return response()->json(['message' => 'Bookmark removed successfully.']);
    }
}