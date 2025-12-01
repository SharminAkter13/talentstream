
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Resume;

class PortalResumeController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to manage your resumes.');
        }

        // Get all resumes of logged-in user
        $resumes = Resume::with(['educations', 'experiences', 'skills'])
            ->where('user_id', Auth::id())
            ->get();

        return view('portal_pages.candidates.manage_resume', compact('resumes'));
    }
}
