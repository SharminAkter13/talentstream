<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    // List all companies
    public function index()
    {
        return response()->json(Company::all(), 200);
    }

    // Show single company
    public function show($id)
    {
        $company = Company::find($id);
        
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        return response()->json($company, 200);
    }

    // Create company
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'industry'          => 'nullable|string|max:255',
            'description'       => 'nullable|string',
            'website'           => 'nullable|url',
            'address'           => 'nullable|string',
            'contact_email'     => 'nullable|email',
            'contact_phone'     => 'nullable|string',
            'logo'              => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'established_year'  => 'nullable|integer',
            'size'              => 'nullable|string',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('companies', 'public');
        }

        $company = Company::create($validated);

        return response()->json($company, 201);
    }    // Update company
    public function update(Request $request, $id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'industry'          => 'nullable|string|max:255',
            'description'       => 'nullable|string',
            'website'           => 'nullable|url',
            'address'           => 'nullable|string',
            'contact_email'     => 'nullable|email',
            'contact_phone'     => 'nullable|string',
            'logo'              => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'established_year'  => 'nullable|integer',
            'size'              => 'nullable|string',
        ]);

        // If new logo uploaded
        if ($request->hasFile('logo')) {
            // delete old logo
            if ($company->logo && Storage::disk('public')->exists($company->logo)) {
                Storage::disk('public')->delete($company->logo);
            }

            $validated['logo'] = $request->file('logo')->store('companies', 'public');
        }

        $company->update($validated);

        return response()->json($company, 200);
    }


    // Delete company
    public function destroy($id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        if ($company->logo && Storage::disk('public')->exists($company->logo)) {
            Storage::disk('public')->delete($company->logo);
        }

        $company->delete();

        return response()->json(['message' => 'Company deleted'], 200);
    }
}
