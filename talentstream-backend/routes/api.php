<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\CandidateController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// routes that require API token
Route::middleware(['api_auth'])->group(function() {
    Route::get('/me', [AuthController::class, 'user']);

    // Admin-only
    Route::middleware(['role:1'])->prefix('admin')->group(function() {
        Route::get('/dashboard-data', [AdminDashboardController::class, 'dashboard']);
    });

    // Employer
    Route::middleware(['role:2'])->prefix('employer')->group(function() {
        Route::get('/dashboard-data', [EmployerDashboardController::class, 'dashboard']);
    });

    // Candidate
    Route::middleware(['role:3'])->prefix('candidate')->group(function() {
        Route::get('/dashboard-data', [CandidateDashboardController::class, 'dashboard']);
    });
});
