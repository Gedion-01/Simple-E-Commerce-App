<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
  
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('user-role', [AuthController::class, 'getUserRole'])->middleware('auth:sanctum');

// Public routes for viewing products
Route::get('products', [ProductController::class, 'index']);
Route::get('products/featured', [ProductController::class, 'getFeaturedProducts']);
Route::get('products/search', [ProductController::class, 'search']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('products/{id}/related', [ProductController::class, 'getRelatedProducts']);


// Protected routes for managing products
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('products', [ProductController::class, 'store'])->middleware('checkRole:admin,vendor');
    Route::put('products/{id}', [ProductController::class, 'update'])->middleware('checkRole:admin,vendor');
    Route::delete('products/{id}', [ProductController::class, 'destroy'])->middleware('checkRole:admin,vendor');
    // Order routes
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders', [OrderController::class, 'listAllOrders'])->middleware('checkRole:admin');
    Route::get('orders/user', [OrderController::class, 'listByUser']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::put('orders/{id}/status', [OrderController::class, 'updateStatus'])->middleware('checkRole:admin,vendor');
    Route::get('orders/{id}/details', [OrderController::class, 'showOrderDetails'])->middleware('checkRole:admin');
    // Admin dashboard data route
    Route::get('admin/dashboard-data', [AdminController::class, 'getDashboardData'])->middleware('checkRole:admin');
});