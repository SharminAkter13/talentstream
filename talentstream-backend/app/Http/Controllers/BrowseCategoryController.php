<?php

// app/Http/Controllers/BrowseCategoryController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class BrowseCategoryController extends Controller
{
    public function index()
    {
        // Fetch only active categories ordered by sort_order
        $categories = Category::where('is_active', 1)
            ->orderBy('sort_order', 'asc')
            ->get();

        // Changed to return JSON
        return response()->json(['categories' => $categories]);
    }
}