<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Models\Role;
use App\Models\Order;

class AdminController extends Controller
{
    public function getDashboardData()
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalUsers = User::count();
        $totalOrders = Order::count();

        $productsPerCategory = Category::withCount('products')->get();
        $usersPerRole = Role::withCount('users')->get();

        return response()->json([
            'totalProducts' => $totalProducts,
            'totalCategories' => $totalCategories,
            'totalUsers' => $totalUsers,
            'totalOrders' => $totalOrders,
            'productsPerCategory' => $productsPerCategory,
            'usersPerRole' => $usersPerRole,
        ]);
    }
}