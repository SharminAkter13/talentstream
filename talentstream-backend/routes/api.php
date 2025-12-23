<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    ProfileController,
    AdminDashboardController,
    CandidateDashboardController,
    EmployerDashboardController,
    CandidateController,
    CategoryController,
    EmployerController,
    JobAlertController,
    JobController,
    UserController,
    ResumeController,
    CompanyController,
    EmployerPackageController,
    PackageController,
    JobLocationController,
    PortalController,
    JobBookmarkController,
    JobViewController,
    NotificationController,
    MessageController,
    ApplicationController,
    PortalJobController,
    ResumePortalController,
    EmployerResumeController,
    CandidateManageApplicationController,
    EmployerManageJobController,
    BrowseCategoryController,
    BrowseJobController,
    PortalJobAlertsController,
    PortalResumeController,
};

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Authentication
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Public Portal Data
Route::get('/', [PortalController::class, 'index']);
Route::get('/browse-jobs', [BrowseJobController::class, 'index']);
Route::get('/browse-categories', [BrowseCategoryController::class, 'index']);
Route::get('/jobs/{job}', [JobController::class, 'show']);
Route::get('/companies/{company}/details', [CompanyController::class, 'getCompanyDetails']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes (Protected by ApiAuth)
|--------------------------------------------------------------------------
*/

// Uses your custom 'api.auth' middleware
Route::middleware(['api.auth'])->group(function () {

    // Core Auth & Profile
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [ProfileController::class, 'index']);

    // Notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::post('/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
    });

    // Messaging
    Route::prefix('chat')->group(function () {
        Route::get('/', [MessageController::class, 'index']);
        Route::get('/contacts', [MessageController::class, 'getContacts']);
        Route::get('/messages/{otherUserId}', [MessageController::class, 'getMessages']);
        Route::post('/send', [MessageController::class, 'sendMessage']);
        Route::post('/{conversation}/read', [MessageController::class, 'markAsRead']);
    });

    // Job Alerts
    Route::apiResource('job_alerts', JobAlertController::class)->except(['show']);
    Route::get('/portal-job-alerts', [PortalJobAlertsController::class, 'index']);

    // Job Bookmarks
    Route::prefix('bookmarks')->group(function () {
        Route::get('/', [JobBookmarkController::class, 'index']);
        Route::post('/{jobId}', [JobBookmarkController::class, 'store']);
        Route::delete('/{id}', [JobBookmarkController::class, 'destroy']);
    });

    // Job View Tracking
    Route::post('/jobs/{job}/view', [JobViewController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Role-Based Routes (Protected by ApiAuth + CheckRole)
|--------------------------------------------------------------------------
*/

// --- Admin Routes (role_id = 1)
Route::middleware(['api.auth', 'role:1'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('users', UserController::class)->except(['show']);
    Route::post('users/{user}/approve', [UserController::class, 'approve']);
    Route::apiResource('resumes', ResumeController::class);
    Route::apiResource('jobs', JobController::class);
    Route::apiResource('candidates', CandidateController::class)->except(['show']);
    Route::apiResource('employers', EmployerController::class)->except(['show']);
    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('job_locations', JobLocationController::class);
    Route::apiResource('packages', PackageController::class);
    Route::apiResource('employer_packages', EmployerPackageController::class);

    Route::get('/job-views', [JobViewController::class, 'index']);
});

// --- Employer Routes (role_id = 2)
Route::middleware(['api.auth', 'role:2'])->prefix('employer')->group(function () {
    Route::get('/dashboard', [EmployerDashboardController::class, 'dashboard']);

    Route::post('/post-job', [PortalJobController::class, 'store']);
    Route::get('/manage-jobs', [PortalJobController::class, 'index']);
    Route::get('/job/{jobId}/applications', [EmployerManageJobController::class, 'viewApplications']);

    Route::get('/browse-resumes', [EmployerResumeController::class, 'index']);
    Route::get('/browse-resumes/{id}', [EmployerResumeController::class, 'show']);
});

// --- Candidate Routes (role_id = 3)
Route::middleware(['api.auth', 'role:3'])->prefix('candidate')->group(function () {
    Route::get('/dashboard', [CandidateDashboardController::class, 'dashboard']);

    Route::post('/resume/store', [ResumePortalController::class, 'store']);
    Route::get('/manage-resumes', [PortalResumeController::class, 'index']);

    Route::get('/manage-applications', [CandidateManageApplicationController::class, 'index']);
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/{id}', [ApplicationController::class, 'show']);
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store']);
});