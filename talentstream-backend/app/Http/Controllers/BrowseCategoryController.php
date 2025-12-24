<?php

// app/Http/Controllers/BrowseCategoryController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class BrowseCategoryController extends Controller
{
   // app/Http/Controllers/BrowseCategoryController.php
    public function index()
    {
        // withCount('jobs') automatically adds a 'jobs_count' field to each category object
        $categories = Category::where('is_active', 1)
            ->withCount('jobs') 
            ->orderBy('sort_order', 'asc')
            ->get();

        // Return the array directly so React's res.data is the list of categories
        return response()->json($categories);
    }
}