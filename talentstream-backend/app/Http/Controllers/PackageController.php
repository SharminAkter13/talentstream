<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController; // Use BaseController
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Use AuthorizesRequests

class PackageController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        // Typically, package management (CRUD) is restricted to Admins (role_id 1)
        // Add middleware for authorization checks (e.g., 'can:manage-packages')
        $this->middleware('auth');
        $this->middleware('can:manage-packages')->except(['index', 'show']); // Assuming 'index' might be public or for all authenticated users
    }

    /**
     * Display a listing of the packages.
     */
    public function index()
    {
        $packages = Package::latest()->paginate(10);
        return view('pages.packages.index', compact('packages'));
    }

    /**
     * Show the form for creating a new package.
     */
    public function create()
    {
        return view('pages.packages.create');
    }

    /**
     * Store a newly created package in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:packages,name', // Added unique validation
            'price' => 'required|numeric|min:0', // Price should be required and non-negative
            'duration_days' => 'required|integer|min:1', // Duration should be required and positive
            'features' => 'nullable|string',
        ]);

        Package::create($request->all());

        return redirect()->route('packages.index')->with('success', 'Package created successfully.');
    }

    /**
     * Show the form for editing the specified package.
     */
    public function edit(Package $package)
    {
        return view('pages.packages.edit', compact('package'));
    }

    /**
     * Update the specified package in storage.
     */
    public function update(Request $request, Package $package)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:packages,name,' . $package->id, // Added unique validation ignoring current ID
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'features' => 'nullable|string',
        ]);

        $package->update($request->all());

        return redirect()->route('packages.index')->with('success', 'Package updated successfully.');
    }

    /**
     * Remove the specified package from storage.
     */
    public function destroy(Package $package)
    {
        // Before deletion, you might want to check if any active subscriptions rely on this package
        // For simplicity, we'll proceed with direct deletion.

        $package->delete();

        return redirect()->route('packages.index')->with('success', 'Package deleted successfully.');
    }
}