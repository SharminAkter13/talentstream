<?php

namespace App\Http\Controllers;

use App\Models\JobLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobLocationController extends Controller
{
    public function index()
    {
        // Return all locations for dropdowns or management list
        $locations = JobLocation::all();
        return response()->json(['locations' => $locations]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'country' => 'required|string|max:100',
            'state'   => 'nullable|string|max:100',
            'city'    => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'postal_code' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $location = JobLocation::create($request->all());

        return response()->json([
            'message' => 'Location added successfully',
            'location' => $location
        ], 201);
    }

    public function destroy($id)
    {
        $location = JobLocation::findOrFail($id);
        $location->delete();
        return response()->json(['message' => 'Location deleted successfully']);
    }
}