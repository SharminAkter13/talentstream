<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\JobAlert;

class PortalJobAlertsController extends Controller
{
     public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to view your job alerts.');
        }

        $jobAlerts = JobAlert::where('user_id', Auth::id())->get();
       
            return view('portal_pages.candidates.job_alerts', compact('jobAlerts'));
}

}