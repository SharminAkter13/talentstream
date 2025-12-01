<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Admin Dashboard Data',
            'user' => auth()->user()
        ]);
    }
}
