<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;

class ProductController extends Controller
{
    // public function index(Request $request)
    // {
    //     $query = Product::with(['images', 'category']);

    //     if ($request->has('search')) {
    //         $search = $request->input('search');
    //         $query->where(function ($q) use ($search) {
    //             $q->where('name', 'LIKE', "%$search%")
    //               ->orWhere('description', 'LIKE', "%$search%");
    //         });
    //     }

    //     if ($request->has('categories')) {
    //         $categories = explode(',', $request->input('categories'));
    //         $query->whereIn('category_id', $categories);
    //     }

    //     if ($request->has('minPrice') && $request->has('maxPrice')) {
    //         $minPrice = $request->input('minPrice');
    //         $maxPrice = $request->input('maxPrice');
    //         $query->whereBetween('price', [$minPrice, $maxPrice]);
    //     }

    //     $page = $request->input('page', 1);
    //     $perPage = $request->input('perPage', 12);
    //     $products = $query->paginate($perPage, ['*'], 'page', $page);

    //     return response()->json($products);
    // }
    public function index(Request $request)
{
    $query = Product::with(['images', 'category']);

    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where(function ($q) use ($search) {
            $q->where('name', 'LIKE', "%$search%")
              ->orWhere('description', 'LIKE', "%$search%");
        });
    }

    if ($request->has('categories') && !empty($request->input('categories'))) {
        $categories = explode(',', $request->input('categories'));
        $query->whereHas('category', function ($q) use ($categories) {
            $q->whereIn('name', $categories);
        });
    }

    if ($request->has('minPrice') && $request->has('maxPrice')) {
        $minPrice = $request->input('minPrice');
        $maxPrice = $request->input('maxPrice');
        $query->whereBetween('price', [$minPrice, $maxPrice]);
    }

    $page = $request->input('page', 1);
    $perPage = $request->input('perPage', 12);
    $products = $query->paginate($perPage, ['*'], 'page', $page);

    return response()->json($products);
}
 
    public function show($id)
    {
        $product = Product::with(['images', 'category'])->findOrFail($id);

        return response()->json($product);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        if (!$query) {
            return response()->json(['message' => 'Query parameter is required'], 400);
        }

        $products = Product::with(['images', 'category'])
            ->where('name', 'LIKE', "%$query%")
            ->orWhere('description', 'LIKE', "%$query%")
            ->paginate(10);

        return response()->json($products);
    }

  public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url', 
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id, 
            'image_urls' => 'required|array', 
            'image_urls.*' => 'required|url' 
        ]);

        foreach ($request->image_urls as $image_url) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_url' => $image_url
            ]);
        }

        return response()->json($product->load('images'), 201);
    } 

     public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'quantity' => 'sometimes|required|integer',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image_urls' => 'sometimes|array', 
            'image_urls.*' => 'sometimes|url' 
        ]);

        $product = Product::findOrFail($id);

        $product->update($request->only([
            'name', 'description', 'price', 'quantity', 'category_id'
        ]));

        if ($request->has('image_urls')) {
            $product->images()->delete();

            foreach ($request->image_urls as $image_url) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $image_url
                ]);
            }
        }

        return response()->json($product->load('images'), 200);
    }

    public function destroy($id)
    {
        
        $product = Product::find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->images()->delete();

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
