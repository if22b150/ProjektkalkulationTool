<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// public routes
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('password-reset', [\App\Http\Controllers\AuthController::class, 'resetPassword']);
Route::post('verify-token', [\App\Http\Controllers\AuthController::class, 'verifyToken']);

// secure routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::put('change-password', [\App\Http\Controllers\AuthController::class, 'changePassword']);
    Route::get('lecturers', [\App\Http\Controllers\LecturerController::class, 'index']);
    Route::get('expenses', [\App\Http\Controllers\ExpenseController::class, 'index']);
    Route::get('faculties', [\App\Http\Controllers\FacultyController::class, 'index']);
    Route::get('project-types', [\App\Http\Controllers\ProjectTypeController::class, 'index']);
    Route::get('projectCategories', [\App\Http\Controllers\ProjectCategoryController::class, 'index']);
    Route::get('companies', [\App\Http\Controllers\CompanyController::class, 'index']);
});

// admin routes
Route::middleware(['auth:sanctum', 'auth.admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::apiResource('companies', \App\Http\Controllers\Admin\CompanyController::class)->except('update');
    Route::post('companies/{companyId}', [\App\Http\Controllers\Admin\CompanyController::class, 'update']);
    Route::apiResource('faculties', \App\Http\Controllers\Admin\FacultyController::class);
    Route::apiResource('faculties.lecturers', \App\Http\Controllers\Admin\LecturerController::class);
    Route::apiResource('users', \App\Http\Controllers\Admin\UserController::class)->except('update');
    Route::apiResource('expenses', \App\Http\Controllers\Admin\ExpenseController::class);
    Route::apiResource('projectCategories', \App\Http\Controllers\Admin\ProjectCategoryController::class);
    Route::apiResource('project-types', \App\Http\Controllers\Admin\ProjectTypeController::class);
    Route::get('projects/fetch/{companyId}', [\App\Http\Controllers\ProjectController::class, 'getProjectsByCompanyId']);
    Route::apiResource('projects', \App\Http\Controllers\ProjectController::class)->only(['update','index','show']);
    Route::patch('projects/{projectId}/set-state', [\App\Http\Controllers\Admin\ProjectController::class, 'updateState']);
    Route::apiResource('notifications', \App\Http\Controllers\Admin\NotificationController::class)->only(['update','index']);
});

// faculty user routes
Route::middleware(['auth:sanctum', 'auth.faculty'])->prefix('faculties/{facultyId}')->name('faculties.')->group(function () {
    Route::apiResource('projects', \App\Http\Controllers\ProjectController::class)->only(['store','index','show','update']);
    Route::get('projects/{projectId}/csv', [\App\Http\Controllers\ProjectController::class, 'exportToCSV']);
    Route::get('projects/{projectId}/pdf', [\App\Http\Controllers\ProjectController::class, 'exportToPDF']);
});
