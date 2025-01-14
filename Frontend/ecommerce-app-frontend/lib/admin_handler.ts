import { PaginatedProducts } from "@/types";
import clientApi from "./clientApi";

interface ProductData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  category_id: number;
  image_url?: string;
  image_urls?: string[];
}

export async function createProduct(productData: ProductData) {
  try {
    const response = await clientApi.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
}

export async function updateProduct(id: number, productData: ProductData) {
  try {
    const response = await clientApi.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = await clientApi.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
}

export async function fetchOrders(page: number = 1) {
  try {
    const response = await clientApi.get(`/orders?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
}

export async function fetchOrderDetails(orderId: number) {
  const response = await clientApi.get(`/orders/${orderId}/details`);
  return response.data;
}

export async function updateOrderStatus(orderId: number, status: string) {
  const response = await clientApi.put(`/orders/${orderId}/status`, { status });
  return response.data;
}

interface GetProductsParams {
  searchTerm?: string;
  selectedCategories?: string[];
  priceRange?: number[];
  page?: number;
  productsPerPage?: number;
}

export async function adminGetProducts({
  searchTerm = "",
  selectedCategories = [],
  priceRange = [0, 20000],
  page = 1,
  productsPerPage = 12,
}: GetProductsParams): Promise<PaginatedProducts> {
  try {
    const response = await clientApi.get("/products", {
      params: {
        search: searchTerm,
        categories: selectedCategories.join(","),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        page,
        perPage: productsPerPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
}

export async function adminGetProduct(id: number) {
  try {
    const response = await clientApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
}
