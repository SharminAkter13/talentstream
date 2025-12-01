<?php

namespace App\Http\Controllers;

use App\Models\EmployerPackage;
use App\Models\Employer;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Added Auth facade for explicit use

class EmployerPackageController extends Controller
{
    /**
     * Display a paginated list of employer packages.
     * Accessible by Admin.
     */
    public function index()
    {
        $employerPackages = EmployerPackage::with(['employer.company', 'package'])
            ->latest()
            ->paginate(10);

        // Converted from view to JSON
        return response()->json([
            'employerPackages' => $employerPackages,
            'message' => 'Employer packages retrieved successfully.'
        ]);
    }

    /**
     * Fetch data required for the create form.
     * Accessible by Admin (to select employer) or Employer (auto-fill their ID).
     */
    public function create()
    {
        // Logged-in user
        $loggedInUser = Auth::user();

        $employer = null;
        $employers = collect();

        // If an employer is logged in, get their profile
        if ($loggedInUser && $loggedInUser->role?->name === 'employer') {
             // We assume 'user_id' in Employer model links to User model's 'id'
            $employer = Employer::with('company')
                ->where('user_id', $loggedInUser->id)
                ->first();
        } 
        
        // If Admin is logged in, load all employers for selection
        if ($loggedInUser && $loggedInUser->role?->name === 'admin') {
            $employers = Employer::with('company')->get();
        }


        // Available packages
        $packages = Package::select('id', 'name', 'duration_days', 'price')->get(); // Added price for context

        // Converted from view to JSON
        return response()->json([
            'packages'     => $packages,
            'employer'     => $employer,     // logged-in employer (auto-fill if applicable)
            'employers'    => $employers,    // admin list (if applicable)
            // Fix: Check if $loggedInUser is not null before calling only()
            'loggedInUser' => $loggedInUser ? $loggedInUser->only(['id', 'name', 'role_id']) : null,
        ]);
    }

    /**
     * Store employer package
     */
    public function store(Request $request)
    {
        $request->validate([
            'employer_id' => 'required|exists:employers,id',
            'package_id'  => 'required|exists:packages,id',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
        ]);

        $employerPackage = EmployerPackage::create([
            'employer_id' => $request->employer_id,
            'package_id'  => $request->package_id,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
            'status'      => 'active',
        ]);

        // Converted from redirect to JSON (201 Created)
        return response()->json([
            'message' => 'Employer package added successfully.',
            'employerPackage' => $employerPackage->load(['employer.company', 'package'])
        ], 201);
    }

    /**
     * Fetch data required for the edit form.
     */
    public function edit(EmployerPackage $employerPackage)
    {
        $employers = Employer::with('company')->get();
        $packages = Package::all();
        
        // Eager load relationships for the package being edited
        $employerPackage->load(['employer.company', 'package']);

        // Converted from view to JSON
        return response()->json(compact('employerPackage', 'employers', 'packages'));
    }

    /**
     * Update employer package
     */
    public function update(Request $request, EmployerPackage $employerPackage)
    {
        $request->validate([
            'employer_id' => 'required|exists:employers,id',
            'package_id'  => 'required|exists:packages,id',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
        ]);

        $employerPackage->update([
            'employer_id' => $request->employer_id,
            'package_id'  => $request->package_id,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
        ]);

        // Converted from redirect to JSON
        return response()->json([
            'message' => 'Employer package updated successfully.',
            'employerPackage' => $employerPackage->load(['employer.company', 'package'])
        ]);
    }

    /**
     * Delete employer package
     */
    public function destroy(EmployerPackage $employerPackage)
    {
        $employerPackage->delete();

        // Converted from redirect to JSON
        return response()->json(['message' => 'Employer package deleted successfully.']);
    }
}