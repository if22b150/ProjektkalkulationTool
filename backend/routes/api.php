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

// secure routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::put('change-password', [\App\Http\Controllers\AuthController::class, 'changePassword']);

    Route::get('lecturers', [\App\Http\Controllers\LecturerController::class, 'index']);
    Route::get('expenses', [\App\Http\Controllers\ExpenseController::class, 'index']);
});

// admin routes
Route::middleware(['auth:sanctum', 'auth.admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::apiResource('faculties', \App\Http\Controllers\Admin\FacultyController::class);
    Route::apiResource('faculties.lecturers', \App\Http\Controllers\Admin\LecturerController::class)->except('update');
    Route::apiResource('users', \App\Http\Controllers\Admin\UserController::class)->except('update');
    Route::apiResource('expenses', \App\Http\Controllers\Admin\ExpenseController::class)->except('update');
});
