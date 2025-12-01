<?php
namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\User;
use App\Models\Role;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class EmployerController extends Controller
{
    /**
     * Display a listing of the employers.
     * Used by Admin dashboard to list all employers.
     */
    public function index()
    {
        // Eager load 'company' relationship for efficiency
        $employers = Employer::with('user', 'company')->get();
        
        // Changed from view to JSON
        return response()->json(['employers' => $employers]);
    }

    /**
     * Show the form for creating a new employer.
     * Used by React to fetch necessary data (companies list).
     */
    public function create()
    {
        $companies = Company::all();
        
        // Changed from view to JSON
        return response()->json(['companies' => $companies]);
    }

    /**
     * Store a newly created employer in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'company_id' => 'required|exists:companies,id',
            'website' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $role = Role::where('name', 'employer')->first();

        if (!$role) {
             return response()->json(['error' => 'Employer role not defined.'], 500);
        }

        // Create User with status pending
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
            'status' => 'pending', // must be approved by admin
        ]);

        // Create Employer profile linked to the User and Company ID
        $employer = $user->employer()->create([
            'company_id' => $request->company_id,
            'website' => $request->website,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        // Changed from redirect to JSON (201 Created)
        return response()->json([
            'message' => 'Employer created successfully. Awaiting admin approval.',
            'user_id' => $user->id,
            'employer' => $employer->load('user', 'company')
        ], 201);
    }
    
    /**
     * Display the specified employer (often used for detail view or pre-populating edit forms).
     */
    public function show(Employer $employer)
    {
        // Load relationships for complete data
        return response()->json(['employer' => $employer->load('user', 'company')]);
    }

    /**
     * Show the form for editing the specified employer.
     * Used by React to fetch the specific employer data and the companies list.
     */
    public function edit(Employer $employer)
    {
        $companies = Company::all();
        
        // Changed from view to JSON
        return response()->json([
            'employer' => $employer->load('user'),
            'companies' => $companies
        ]);
    }

    /**
     * Update the specified employer in storage.
     */
    public function update(Request $request, Employer $employer)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$employer->user_id,
            'company_id' => 'required|exists:companies,id',
            'website' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        // Update User
        $employer->user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Update Employer profile
        $employer->update($request->only(['company_id','website','phone','address']));

        // Changed from redirect to JSON
        return response()->json([
            'message' => 'Employer updated successfully!',
            'employer' => $employer->load('user', 'company')
        ]);
    }

    /**
     * Remove the specified employer from storage.
     */
    public function destroy(Employer $employer)
    {
        // Delete User, which should cascade delete the Employer profile
        $employer->user()->delete(); 
        
        // Changed from redirect to JSON
        return response()->json(['message' => 'Employer deleted successfully!']);
    }
}