<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;

class CandidateManageApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::with('job')
            ->where('candidate_id', auth()->id())
            ->orderBy('applied_date', 'desc')
            ->paginate(10);

        return view('portal_pages.candidates.manage_application', compact('applications'));
    }
}