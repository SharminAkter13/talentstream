<?php
namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\User;
use App\Models\Role;
use App\Models\Company; // <-- NEW: Import Company model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class EmployerController extends Controller
{
    public function index()
    {
        // UPDATED: Eager load 'company' relationship for efficiency in the index view
        $employers = Employer::with('user', 'company')->get();
        return view('pages.employers.index', compact('employers'));
    }

    public function create()
    {
        // UPDATED: Pass the list of companies to the view for the dropdown
        $companies = Company::all();
        return view('pages.employers.create', compact('companies'));
    }

    public function store(Request $request)
    {
        // UPDATED: Validate company_id instead of company_name
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'company_id' => 'required|exists:companies,id', // <-- VALIDATE ID
            'website' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $role = Role::where('name', 'employer')->first();

        // Create User with status pending
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
            'status' => 'pending', // must be approved by admin
        ]);

        // NEW: Create Employer profile linked to the User and Company ID
        $user->employer()->create([
            'company_id' => $request->company_id,
            'website' => $request->website,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('employers.index')->with('success', 'Employer created successfully. Awaiting admin approval.');
    }

    public function edit(Employer $employer)
    {
        // UPDATED: Pass the list of companies to the view for the dropdown
        $companies = Company::all();
        return view('pages.employers.edit', compact('employer', 'companies'));
    }

    public function update(Request $request, Employer $employer)
    {
        // UPDATED: Validate company_id instead of company_name
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$employer->user_id,
            'company_id' => 'required|exists:companies,id', // <-- VALIDATE ID
            'website' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        // Update User
        $employer->user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // UPDATED: Update Employer profile using company_id
        $employer->update($request->only(['company_id','website','phone','address']));

        return redirect()->route('employers.index')->with('success', 'Employer updated successfully!');
    }

    public function destroy(Employer $employer)
    {
        $employer->user()->delete(); // deletes employer profile automatically
        return redirect()->route('employers.index')->with('success', 'Employer deleted successfully!');
    }
}