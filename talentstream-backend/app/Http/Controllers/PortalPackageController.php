<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package; // Ensure this is imported

class PortalPackageController extends Controller
{
    public function getAllPackages() {
        // Fetch packages from the database
        $packages = Package::latest()->get();

        // Transform the data to include fields required by Home.jsx
        $formattedPackages = $packages->map(function($pkg) {
            return [
                'id' => $pkg->id,
                'name' => $pkg->name,
                'price' => $pkg->price,
                // If features aren't in your DB, you can provide defaults or decode JSON
                'features' => is_array($pkg->features) ? $pkg->features : ['Feature 1', 'Feature 2', 'Feature 3'], 
                'iconClass' => $pkg->iconClass ?? 'lni-package', // Default icon if missing
                'borderColorClass' => $pkg->borderColorClass ?? 'border-primary',
            ];
        });

        // Return wrapped in a 'data' key for better consistency
        return response()->json(['data' => $formattedPackages]);
    }
}