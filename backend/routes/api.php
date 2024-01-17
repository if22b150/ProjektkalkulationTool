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
});

// admin routes
Route::middleware(['auth:sanctum', 'auth.admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::apiResource('faculties', \App\Http\Controllers\Admin\FacultyController::class);
    Route::apiResource('users', \App\Http\Controllers\Admin\UserController::class)->except('update');
    Route::apiResource('lecturers', \App\Http\Controllers\Admin\LecturerController::class)->except('update');
});
