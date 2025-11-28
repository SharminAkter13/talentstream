<?php
namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        return view('pages.companies.index', compact('companies'));
    }

  
    public function create()
    {
        return view('pages.companies.create');
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

        Company::create($request->all());

        return redirect()->route('companies.index')->with('success', 'Company created successfully!');
    }

    public function edit(Company $company)
    {
        return view('pages.companies.edit', compact('company'));
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

        return redirect()->route('companies.index')->with('success', 'Company updated successfully!');
    }

    public function destroy(Company $company)
    {
        if ($company->employers()->count() > 0) {
            return redirect()->route('companies.index')->with('error', 'Cannot delete company with associated employers.');
        }

        $company->delete();
        return redirect()->route('companies.index')->with('success', 'Company deleted successfully!');
    }

   
    public function getCompanyDetails(Company $company)
    {
        return response()->json([
            'website' => $company->website,
            'phone' => $company->contact_phone, 
            'address' => $company->address,
        ]);
    }
}