<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    // --- Authentication & Core ---
    AuthController,
    ProfileController,

    // --- Dashboard Controllers ---
    AdminDashboardController,
    CandidateDashboardController,
    EmployerDashboardController,

    // --- CRUD/Resource Controllers ---
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

    // --- Portal/Feature Controllers ---
    PortalController, // For public portal data
    JobBookmarkController,
    JobViewController,
    NotificationController,
    MessageController,

    // --- Application & Resume Flow ---
    ApplicationController,
    PortalJobController,
    ResumePortalController,
    EmployerResumeController,
    CandidateManageApplicationController,
    EmployerManageJobController,

    // --- Browsing Controllers (Public/Auth Shared) ---
    BrowseCategoryController,
    BrowseJobController,
    PortalJobAlertsController,
    PortalResumeController,
};

/*
|--------------------------------------------------------------------------
| Public Routes (No Authentication Required)
|--------------------------------------------------------------------------
| These routes expose data needed for initial page loads (e.g., job lists)
| and the core login/registration functionality.
*/

// Authentication
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// General Public Data
Route::get('/', [PortalController::class, 'index']); // Main public data endpoint
Route::get('/browse-jobs', [BrowseJobController::class, 'index']);
Route::get('/browse-categories', [BrowseCategoryController::class, 'index']);
Route::get('/jobs/{job}', [JobController::class, 'show']); // View single job
Route::get('/companies/{company}/details', [CompanyController::class, 'getCompanyDetails']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes (Requires API Token)
|--------------------------------------------------------------------------
| Uses the 'auth:sanctum' guard.
*/

Route::middleware('auth:sanctum')->group(function () {

    // 🔑 Core Auth & Profile
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::get('/me', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [ProfileController::class, 'index']);

    // 🔔 Notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::post('/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
    });

    // 💬 Messaging
    Route::prefix('chat')->group(function () {
        Route::get('/', [MessageController::class, 'index']);
        Route::get('/contacts', [MessageController::class, 'getContacts']);
        Route::get('/messages/{otherUserId}', [MessageController::class, 'getMessages']);
        Route::post('/send', [MessageController::class, 'sendMessage']);
        Route::post('/{conversation}/read', [MessageController::class, 'markAsRead']);
    });

    // 🚨 Job Alerts
    Route::resource('job_alerts', JobAlertController::class)->except(['show']);
    Route::get('/portal-job-alerts', [PortalJobAlertsController::class, 'index']);

    // 🔖 Job Bookmark
    Route::prefix('bookmarks')->group(function () {
        Route::get('/', [JobBookmarkController::class, 'index']);
        Route::post('/{jobId}', [JobBookmarkController::class, 'store']);
        Route::delete('/{id}', [JobBookmarkController::class, 'destroy']);
    });

    // 👁️ Job View Tracking
    Route::post('/jobs/{job}/view', [JobViewController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| 🛡️ Role Protected Routes (auth:sanctum AND role:X)
|--------------------------------------------------------------------------
*/

// --- 👑 Admin Routes (Role ID: 1) ---
Route::middleware(['auth:sanctum', 'role:1'])->prefix('admin')->group(function () {

    Route::get('/dashboard', [AdminDashboardController::class, 'dashboard']); // Your dashboard-data

    // CRUD/Resource Management
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('users', UserController::class)->except(['show']);
    Route::post('users/{user}/approve', [UserController::class, 'approve']);
    Route::resource('resumes', ResumeController::class);
    Route::resource('jobs', JobController::class);
    Route::resource('candidates', CandidateController::class)->except(['show']);
    Route::resource('employers', EmployerController::class)->except(['show']);
    Route::resource('companies', CompanyController::class)->except(['show']);
    Route::resource('job_locations', JobLocationController::class);
    Route::resource('packages', PackageController::class);
    Route::resource('employer_packages', EmployerPackageController::class);

    // Admin-Specific Views
    Route::get('/job-views', [JobViewController::class, 'index']); // Admin view of job views
});

// --- 💼 Employer Routes (Role ID: 2) ---
Route::middleware(['auth:sanctum', 'role:2'])->prefix('employer')->group(function () {

    Route::get('/dashboard', [EmployerDashboardController::class, 'dashboard']); // Your dashboard-data

    // Job Posting & Management
    Route::get('/post-job', [PortalJobController::class, 'create']);
    Route::post('/post-job', [PortalJobController::class, 'store']);
    Route::get('/manage-jobs', [PortalJobController::class, 'index']);
    
    // Application Viewing
    Route::get('/job/{jobId}/applications', [EmployerManageJobController::class, 'viewApplications']);

    // Resume Browsing (Employers view Candidate Resumes)
    Route::get('/browse-resumes', [EmployerResumeController::class, 'index']);
    Route::get('/browse-resumes/{id}', [EmployerResumeController::class, 'show']);
});

// --- 👤 Candidate Routes (Role ID: 3) ---
Route::middleware(['auth:sanctum', 'role:3'])->prefix('candidate')->group(function () {

    Route::get('/dashboard', [CandidateDashboardController::class, 'dashboard']); // Your dashboard-data

    // Resume Management
    Route::get('/resume/create', [ResumePortalController::class, 'create']);
    Route::post('/resume/store', [ResumePortalController::class, 'store']);
    Route::get('/manage-resumes', [PortalResumeController::class, 'index']);

    // Application Management
    Route::get('/manage-applications', [CandidateManageApplicationController::class, 'index']);
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/{id}', [ApplicationController::class, 'show']);
    Route::get('/applications/create/{jobId}', [ApplicationController::class, 'create']);
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store']);
});