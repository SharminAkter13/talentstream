<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;

class PortalPackageController extends Controller
{
    public function getAllPackages() {
        $packages = Package::latest()->get();

        $formattedPackages = $packages->map(function($pkg) {
            // Fix: Convert the comma-separated string from the DB into an array
            $featuresArray = [];
            if (!empty($pkg->features)) {
                // Explode by comma and trim extra spaces
                $featuresArray = array_map('trim', explode(',', $pkg->features));
            }

            return [
                'id' => $pkg->id,
                'name' => $pkg->name,
                'price' => $pkg->price,
                'duration_days' => $pkg->duration_days,
                'features' => $featuresArray, // Now this is a proper array
                'iconClass' => $this->getIconForPackage($pkg->name),
                'borderColorClass' => $this->getBorderColor($pkg->name),
            ];
        });

        return response()->json(['data' => $formattedPackages]);
    }

    // Helper to assign icons based on package name
    private function getIconForPackage($name) {
        $name = strtolower($name);
        if (str_contains($name, 'starter')) return 'lni-leaf';
        if (str_contains($name, 'professional')) return 'lni-star';
        if (str_contains($name, 'business')) return 'lni-briefcase';
        return 'lni-rocket';
    }

    private function getBorderColor($name) {
        $name = strtolower($name);
        if (str_contains($name, 'starter')) return 'border-success';
        if (str_contains($name, 'professional')) return 'border-primary';
        return 'border-danger';
    }
}