<?php
namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        // Changed to return JSON
        return response()->json(['companies' => $companies]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:companies,name',
            'industry' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'address' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
        ]);

        $company = Company::create($request->all());

        // Changed to return JSON (201 Created)
        return response()->json([
            'message' => 'Company created successfully!',
            'company' => $company
        ], 201);
    }

    /**
     * Display the specified company (Used by Edit in React).
     */
    public function show(Company $company)
    {
        // Changed to return JSON
        return response()->json(['company' => $company]);
    }

    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:companies,name,' . $company->id,
            'industry' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'address' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
        ]);

        $company->update($request->all());

        // Changed to return JSON
        return response()->json([
            'message' => 'Company updated successfully!',
            'company' => $company
        ]);
    }

    public function destroy(Company $company)
    {
        if ($company->employers()->count() > 0) {
            // Changed to return JSON (409 Conflict)
            return response()->json([
                'message' => 'Cannot delete company with associated employers.'
            ], 409);
        }

        $company->delete();
        // Changed to return JSON
        return response()->json(['message' => 'Company deleted successfully!']);
    }

    public function getCompanyDetails(Company $company)
    {
        // Already returns JSON (good)
        return response()->json([
            'website' => $company->website,
            'phone' => $company->contact_phone, 
            'address' => $company->address,
        ]);
    }
}