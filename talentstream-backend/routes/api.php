<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController, ProfileController, AdminDashboardController,
    CandidateDashboardController, EmployerDashboardController,
    CandidateController, CategoryController, EmployerController,
    JobAlertController, JobController, UserController, ResumeController,
    CompanyController, EmployerPackageController, PackageController,
    JobLocationController, PortalController, JobBookmarkController,
    JobViewController, NotificationController, MessageController,
    ApplicationController, PortalJobController, ResumePortalController,
    EmployerResumeController, CandidateManageApplicationController,
    EmployerManageJobController, BrowseCategoryController,
    BrowseJobController, JobSkillController, JobTypeController, PortalJobAlertsController, PortalResumeController
};
use App\Http\Controllers\Employer\JobController as EmployerJobController;

// ==============================
// PUBLIC API (NO AUTH)
// ==============================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/portal-data', [PortalController::class, 'index']);
Route::get('/browse-jobs', [BrowseJobController::class, 'index']);
Route::get('/browse-categories', [BrowseCategoryController::class, 'index']);
Route::get('/jobs/{job}', [JobController::class, 'show']);
Route::get('/companies/{company}/details', [CompanyController::class, 'getCompanyDetails']);
Route::post('/jobs/{id}/view', [JobViewController::class, 'store']);
// ==============================
// AUTHENTICATED API
// ==============================
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Profile
    Route::get('/profile', [ProfileController::class, 'index']);

    // ======================
    // NOTIFICATIONS (API)
    // ======================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);
});

    // ======================
    // CHAT / MESSAGING (API)
    // ======================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chat/contacts', [MessageController::class, 'getContacts']);
    Route::get('/chat/messages/{otherUserId}', [MessageController::class, 'getMessages']);
    Route::post('/chat/send', [MessageController::class, 'sendMessage']);
    Route::post('/chat/seen', [MessageController::class, 'markAsSeen']);
});
    // ======================
    // JOB ALERTS
    // ======================
    Route::apiResource('job-alerts', JobAlertController::class)->except(['show']);
    Route::get('/portal-job-alerts', [PortalJobAlertsController::class, 'index']);

    // ======================
    // BOOKMARKS
    // ======================
    Route::get('/bookmarks', [JobBookmarkController::class, 'index']);
    Route::post('/bookmarks/{jobId}', [JobBookmarkController::class, 'store']);
    Route::delete('/bookmarks/{id}', [JobBookmarkController::class, 'destroy']);

    // Job View Tracking
    Route::post('/jobs/{job}/view', [JobViewController::class, 'store']);

    // ==================================================
    // ADMIN (role_id = 1)
    // ==================================================
    Route::middleware('role:1')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index']);
        Route::apiResource('categories', CategoryController::class);
        Route::post('/users/{user}/approve', [UserController::class, 'approve']);
        Route::apiResource('users', UserController::class)->except(['show']);
        Route::apiResource('resumes', ResumeController::class);
        Route::apiResource('jobs', JobController::class)->except(['store']);
        Route::apiResource('candidates', CandidateController::class)->except(['show']);
        Route::apiResource('employers', EmployerController::class)->except(['show']);
        Route::apiResource('companies', CompanyController::class);
        Route::apiResource('job-locations', JobLocationController::class);
        Route::apiResource('packages', PackageController::class);
        Route::apiResource('employer-packages', EmployerPackageController::class);
        Route::get('/job-views', [JobViewController::class, 'index']);
        Route::get('/skills', [JobSkillController::class, 'index']);
        Route::post('/skills', [JobSkillController::class, 'store']);
        Route::delete('/skills/{id}', [JobSkillController::class, 'destroy']);
        Route::get('/job-types', [JobTypeController::class, 'index']);
    Route::post('/job-types', [JobTypeController::class, 'store']);
    Route::delete('/job-types/{id}', [JobTypeController::class, 'destroy']);

    });

    // ==================================================
    // EMPLOYER (role_id = 2)
    // ==================================================
    Route::middleware('role:2')->prefix('employer')->group(function () {

        // Dashboard
        Route::get('/dashboard', [EmployerDashboardController::class, 'dashboard']);

        // Employer Job CRUD (Dashboard)
        Route::get('jobs', [JobController::class, 'index']);
        Route::get('jobs/create', [JobController::class, 'create']);
        Route::post('jobs', [JobController::class, 'store']);
        Route::get('jobs/{id}', [JobController::class, 'show']);
        Route::post('jobs/{id}', [JobController::class, 'update']);   // because of multipart
        Route::delete('jobs/{id}', [JobController::class, 'destroy']);

        // Applications
        Route::get('/job/{jobId}/applications', [EmployerManageJobController::class, 'viewApplications']);

        // Resume browsing
        Route::get('/browse-resumes', [EmployerResumeController::class, 'index']);
        Route::get('/browse-resumes/{id}', [EmployerResumeController::class, 'show']);
        Route::get('/job-statistics/views', [JobViewController::class, 'index']);
        Route::apiResource('companies', CompanyController::class);

        // ======================
        // PORTAL JOB POSTING
        // (Separate from dashboard CRUD)
        // ======================
        Route::get('/portal/jobs', [PortalJobController::class, 'index']);
        Route::post('/portal/jobs', [PortalJobController::class, 'store']);
        Route::delete('/portal/jobs/{job}', [PortalJobController::class, 'destroy']);
    });

    // ==================================================
    // CANDIDATE (role_id = 3)
    // ==================================================
    Route::middleware('role:3')->prefix('candidate')->group(function () {

        Route::get('/dashboard', [CandidateDashboardController::class, 'dashboard']);

        // Resume
        // Route::post('/resume', [ResumePortalController::class, 'store']);
        // Route::get('/manage-resumes', [PortalResumeController::class, 'index']);
        Route::get('resumes', [ResumeController::class, 'index']);
        Route::post('resumes', [ResumeController::class, 'store']);
        Route::get('resumes/{resume}', [ResumeController::class, 'show']);
        Route::post('resumes/{resume}', [ResumeController::class, 'update']); // PUT with files is difficult → use POST
        Route::delete('resumes/{resume}', [ResumeController::class, 'destroy']);

        // Applications
        Route::get('/manage-applications', [CandidateManageApplicationController::class, 'index']);
        Route::get('/applications', [ApplicationController::class, 'index']);
        Route::get('/applications/{id}', [ApplicationController::class, 'show']);
        Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store']);
    });
});
