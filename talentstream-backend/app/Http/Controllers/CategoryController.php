<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        // Changed to return JSON
        return response()->json(['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $data = $request->all();

        if ($request->hasFile('image_path')) {
            $data['image_path'] = $request->file('image_path')->store('category_images', 'public');
        }

        $data['is_active'] = $request->boolean('is_active');
        
        $category = Category::create($data);

        // Changed to return JSON (201 Created)
        return response()->json([
            'message' => 'Category created successfully.',
            'category' => $category
        ], 201);
    }

    /**
     * Display the specified category (Used by Edit in React).
     */
    public function show(Category $category)
    {
        // Changed to return JSON
        return response()->json(['category' => $category]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Category $category)
    {
        // 1. Validation
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', 
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // 2. Prepare data
        $data = $request->except(['image_path', 'remove_image']); 

        // 3. Image Handling Logic
        if ($request->hasFile('image_path')) {
            if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
                Storage::disk('public')->delete($category->image_path);
            }
            $data['image_path'] = $request->file('image_path')->store('category_images', 'public');
        } 
        elseif ($request->has('remove_image') && $request->input('remove_image') == 1) {
            if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
                Storage::disk('public')->delete($category->image_path);
            }
            $data['image_path'] = null; 
        } 
        else {
            $data['image_path'] = $category->image_path; 
        }

        $data['is_active'] = $request->boolean('is_active');
        
        $category->update($data);

        // Changed to return JSON
        return response()->json([
            'message' => 'Category updated successfully.',
            'category' => $category
        ]);
    }

    public function destroy(Category $category)
    {
        if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
            Storage::disk('public')->delete($category->image_path);
        }

        $category->delete();
        
        // Changed to return JSON
        return response()->json(['message' => 'Category deleted successfully.']);
    }
}