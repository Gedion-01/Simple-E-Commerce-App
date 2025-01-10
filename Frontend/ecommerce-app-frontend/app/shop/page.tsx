import { getProducts } from "../../lib/api";
import { PaginatedProducts } from "../../types";
import FilterSidebar from "./_components/filter-sidebar";
import ProductList from "./_components/product-list";

const predefinedCategories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Sports & Outdoors",
  "Beauty & Personal Care",
];

interface ShopPageProps {
  products: PaginatedProducts;
  categories: string[];
  searchTerm: string;
  selectedCategories: string[];
  priceRange: number[];
  currentPage: number;
  productsPerPage: number;
}

async function fetchProducts({
  searchTerm = "",
  selectedCategories = [],
  priceRange = [0, 2000],
  page = 1,
  productsPerPage = 12,
}: {
  searchTerm?: string;
  selectedCategories?: string[];
  priceRange?: number[];
  page?: number;
  productsPerPage?: number;
}): Promise<PaginatedProducts> {
  return await getProducts({
    searchTerm,
    selectedCategories,
    priceRange,
    page,
    productsPerPage,
  });
}

export default async function ShopPage({
  searchTerm = "",
  categories = predefinedCategories,
  selectedCategories = [],
  priceRange = [0, 2000],
  currentPage = 1,
  productsPerPage = 12,
}: Partial<ShopPageProps>) {
  console.log("ShopPageProps", {
    searchTerm,
    categories,
    selectedCategories,
    priceRange,
    currentPage,
    productsPerPage,
  });

  let products: PaginatedProducts | null = null;
  try {
    products = await fetchProducts({
      searchTerm,
      selectedCategories,
      priceRange,
      page: currentPage,
      productsPerPage,
    });
    console.log("products", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  if (!products || products.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar
            categories={categories}
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
          />
          <div className="w-full md:w-3/4">
            <p>No products found matching your criteria.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar
          categories={categories}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
        />
        <ProductList
          products={products.data}
          currentPage={products.current_page}
          productsPerPage={products.per_page}
          totalProducts={products.total}
        />
      </div>
    </div>
  );
}
