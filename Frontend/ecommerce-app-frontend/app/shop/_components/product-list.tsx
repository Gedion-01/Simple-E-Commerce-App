"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  currentPage,
  productsPerPage,
  totalProducts,
}) => {
  const router = useRouter();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", page.toString());
    const params = currentParams.toString();

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full md:w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant={currentPage === number ? "default" : "outline"}
            className="mx-1"
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
