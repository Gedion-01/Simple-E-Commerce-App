import { PaginatedProducts } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://ecommerce-app.test/api",
  headers: {
    "Content-Type": "application/json",
  },
});

interface GetProductsParams {
  searchTerm?: string;
  selectedCategories?: string[];
  priceRange?: number[];
  page?: number;
  productsPerPage?: number;
}

export async function getProducts({
  searchTerm = "",
  selectedCategories = [],
  priceRange = [0, 200],
  page = 1,
  productsPerPage = 12,
}: GetProductsParams): Promise<PaginatedProducts> {
  try {
    const response = await api.get("/products", {
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

export async function getProduct(id: number) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
}

export async function getRelatedProducts(id: number) {
  try {
    const response = await api.get(`/products/${id}/related`);
    return response.data;
  } catch (error) {
    console.error("Error fetching related products", error);
    throw error;
  }
}

export async function getFeaturedProducts() {
  try {
    const response = await api.get("/products/featured");
    console.log("featured products", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products", error);
    throw error;
  }
}
