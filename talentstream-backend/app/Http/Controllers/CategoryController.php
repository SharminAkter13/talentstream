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
        return view('pages.categories.index', compact('categories'));
    }

    public function create()
    {
        return view('pages.categories.create');
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

        // Handle file upload for creation
        if ($request->hasFile('image_path')) {
            $data['image_path'] = $request->file('image_path')->store('category_images', 'public');
        }

        // Ensure is_active is set correctly
        $data['is_active'] = $request->boolean('is_active');
        
        Category::create($data);

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        return view('pages.categories.edit', compact('category'));
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Category $category)
    {
        // 1. Validation
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            // Check for image validation only if a file is present
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', 
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // 2. Prepare data (excluding file/removal flags for now)
        $data = $request->except(['image_path', 'remove_image']); 

        // 3. Image Handling Logic

        // Case A: A new image file has been uploaded
        if ($request->hasFile('image_path')) {
            
            // Delete old image if it exists
            if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
                Storage::disk('public')->delete($category->image_path);
            }
            
            // Store the new image
            $data['image_path'] = $request->file('image_path')->store('category_images', 'public');
        } 
        
        // Case B: The user checked the 'remove image' box
        elseif ($request->has('remove_image') && $request->input('remove_image') == 1) {
            
            // Delete old image if it exists
            if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
                Storage::disk('public')->delete($category->image_path);
            }
            
            // Set path to null in the database
            $data['image_path'] = null; 
        } 
        
        else {
            $data['image_path'] = $category->image_path; 
        }

        $data['is_active'] = $request->boolean('is_active');
        
 
        $category->update($data);

        return redirect()->route('categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
            Storage::disk('public')->delete($category->image_path);
        }

        $category->delete();
        
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
