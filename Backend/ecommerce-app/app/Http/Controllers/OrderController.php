<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'zip_code' => 'required|string|max:20',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $orderData = $request->only(['full_name', 'email', 'address', 'city', 'zip_code']);
        $order = Order::create($orderData);

        $products = $request->input('products');
        foreach ($products as $product) {
            $productModel = Product::find($product['id']);
            $order->products()->attach($productModel, [
                'quantity' => $product['quantity'],
                'price' => $productModel->price,
            ]);

            // Decrement the product quantity
            $productModel->decrement('quantity', $product['quantity']);
        }

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load('products'),
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $order = Order::with('products')->findOrFail($id);

        return response()->json($order);
    }

    
    public function listByUser(Request $request): JsonResponse
    {
        $user = Auth::guard('sanctum')->user();

        $orders = Order::where('email', $user->email)->with('products')->paginate(5);

        return response()->json($orders);
    }

    public function updateStatus($id, Request $request): JsonResponse
    {
        $order = Order::findOrFail($id);
        $order->status = $request->input('status');
        $order->save();

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order,
        ]);
    }

  public function listAllOrders(): JsonResponse
    {
        $orders = Order::with('products')->paginate(10);

        return response()->json($orders);
    }

    // New method to show order details
    public function showOrderDetails($id): JsonResponse
    {
        $order = Order::with('products')->findOrFail($id);

        return response()->json($order);
    }
}