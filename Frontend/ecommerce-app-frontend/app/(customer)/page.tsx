import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { Categories } from "@/components/categories-section";
import { FearuredProducts } from "@/components/featured-products";
import { getFeaturedProducts } from "@/lib/products_handler";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div>
      <HeroSection />
      <Categories />

      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <FearuredProducts featuredProducts={featuredProducts} />
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-dark transition duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
