<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;

class CandidateManageApplicationController extends Controller
{
    public function index()
    {
        // Use auth()->user() or Auth::id() for clarity
        $candidateId = Auth::id(); 

        $applications = Application::with('job')
            ->where('candidate_id', $candidateId)
            ->orderBy('applied_date', 'desc')
            ->paginate(10);

        // Changed to return JSON
        return response()->json(['applications' => $applications]);
    }
}