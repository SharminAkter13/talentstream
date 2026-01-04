<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class PackageController extends BaseController
{
    /**
     * Display a listing of packages as JSON for frontend.
     */
    public function index()
    {
        // Fetch all packages, latest first
        $packages = Package::latest()->get();

        // Return JSON response
        return response()->json([
            'success' => true,
            'packages' => $packages,
        ]);
    }

    /**
     * Store a newly created package.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:packages,name',
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'features' => 'nullable|string',
        ]);

        $package = Package::create($request->all());

        return response()->json([
            'success' => true,
            'package' => $package,
            'message' => 'Package created successfully',
        ]);
    }

    /**
     * Show a single package as JSON.
     */
    public function show(Package $package)
    {
        return response()->json([
            'success' => true,
            'package' => $package,
        ]);
    }

    /**
     * Update a package.
     */
    public function update(Request $request, Package $package)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:packages,name,' . $package->id,
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'features' => 'nullable|string',
        ]);

        $package->update($request->all());

        return response()->json([
            'success' => true,
            'package' => $package,
            'message' => 'Package updated successfully',
        ]);
    }

    /**
     * Delete a package.
     */
    public function destroy(Package $package)
    {
        $package->delete();

        return response()->json([
            'success' => true,
            'message' => 'Package deleted successfully',
        ]);
    }
}
