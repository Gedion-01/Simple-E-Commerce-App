<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
  
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Public routes for viewing products
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('products/search', [ProductController::class, 'search']);

// Protected routes for managing products
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('products', [ProductController::class, 'store'])->middleware('checkRole:admin,vendor');
    Route::put('products/{id}', [ProductController::class, 'update'])->middleware('checkRole:admin,vendor');
    Route::delete('products/{id}', [ProductController::class, 'destroy'])->middleware('checkRole:admin,vendor');
});