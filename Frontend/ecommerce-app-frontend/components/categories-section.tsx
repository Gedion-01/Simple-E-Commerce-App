"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    id: 1,
  },
  {
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    id: 2,
  },
  {
    name: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2070&auto=format&fit=crop",
    id: 3,
  },
  {
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop",
    id: 4,
  },
  {
    name: "Sports & Outdoors",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
    id: 5,
  },
  {
    name: "Beauty & Personal Care",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070&auto=format&fit=crop",
    id: 6,
  },
] as const;

export function Categories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/shop?categories=${encodeURIComponent(category.name)}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-semibold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
