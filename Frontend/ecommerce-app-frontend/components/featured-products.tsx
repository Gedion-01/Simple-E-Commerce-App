"use client";

import { Product } from "@/types";
import { motion } from "framer-motion";
import ProductCard from "./product-card";

export function FearuredProducts({
  featuredProducts,
}: {
  featuredProducts: Product[];
}) {
  return (
    <>
      {featuredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image_url: product.image_url!,
                }}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center">No featured products available.</p>
      )}
    </>
  );
}
