import { getProducts } from "@/lib/products_handler";
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
  searchParams: { [key: string]: string | string[] | undefined };
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

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const searchTerm = (searchParams.search as string) || "";
  const categories = predefinedCategories;
  const selectedCategories = searchParams.categories
    ? (searchParams.categories as string).split(",")
    : [];
  const minPrice = parseInt((searchParams.minPrice as string) || "0", 10);
  const maxPrice = parseInt((searchParams.maxPrice as string) || "2000", 10);
  const priceRange = [minPrice, maxPrice];
  const currentPage = parseInt((searchParams.page as string) || "1", 10);
  const productsPerPage = 12;

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
  console.log(
    "process.env.NEXT_PUBLIC_API_BASE_URL",
    process.env.NEXT_PUBLIC_API_BASE_URL
  );
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
