<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\DemoController;
Route::get('demo', [DemoController::class, 'index']);
Route::post('/demo/search', [DemoController::class, 'search']);
Route::get('demo/{item}', [DemoController::class, 'show']);
Route::post('demo', [DemoController::class, 'store']);
Route::post('/demo/{item}', [DemoController::class, 'update']);
Route::delete('demo/{item}', [DemoController::class, 'destroy']);


use App\Http\Controllers\Api\EmployeeController;
Route::get('employee', [EmployeeController::class, 'index']);
Route::post('/employee/search', [EmployeeController::class, 'search']);
Route::get('employee/{item}', [EmployeeController::class, 'show']);
Route::post('employee', [EmployeeController::class, 'store']);
Route::post('/employee/{item}', [EmployeeController::class, 'update']);
Route::delete('employee/{item}', [EmployeeController::class, 'destroy']);


use App\Http\Controllers\Api\DepartmentController;
Route::get('department', [DepartmentController::class, 'index']);
Route::post('/department/search', [DepartmentController::class, 'search']);
Route::get('department/{item}', [DepartmentController::class, 'show']);
Route::post('department', [DepartmentController::class, 'store']);
Route::post('/department/{item}', [DepartmentController::class, 'update']);
Route::delete('department/{item}', [DepartmentController::class, 'destroy']);


use App\Http\Controllers\Api\FileController;
Route::get('file', [FileController::class, 'index']);
Route::post('/file/search', [FileController::class, 'search']);
Route::get('file/{item}', [FileController::class, 'show']);
Route::post('file', [FileController::class, 'store']);
Route::post('/file/{item}', [FileController::class, 'update']);
Route::delete('file/{item}', [FileController::class, 'destroy']);


use App\Http\Controllers\Api\EmployeeFileController;
Route::get('employee_file', [EmployeeFileController::class, 'index']);
Route::post('/employee_file/search', [EmployeeFileController::class, 'search']);
Route::get('employee_file/{item}', [EmployeeFileController::class, 'show']);
Route::post('employee_file', [EmployeeFileController::class, 'store']);
Route::post('/employee_file/{item}', [EmployeeFileController::class, 'update']);
Route::delete('employee_file/{item}', [EmployeeFileController::class, 'destroy']);


use App\Http\Controllers\Api\FamilyController;
Route::get('family', [FamilyController::class, 'index']);
Route::post('/family/search', [FamilyController::class, 'search']);
Route::get('family/{item}', [FamilyController::class, 'show']);
Route::post('family', [FamilyController::class, 'store']);
Route::post('/family/{item}', [FamilyController::class, 'update']);
Route::delete('family/{item}', [FamilyController::class, 'destroy']);
