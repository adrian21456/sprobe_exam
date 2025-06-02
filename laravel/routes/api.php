<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Middleware\ExpireSanctumTokens;
use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [LoginController::class, 'login']);

// Protected routes
Route::middleware(['auth:sanctum', ExpireSanctumTokens::class, ForceJsonResponse::class])->group(function () {
    // Get current user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    require("mods.php");


    // Logout
    Route::post('/logout', [LoginController::class, 'logout']);
});
