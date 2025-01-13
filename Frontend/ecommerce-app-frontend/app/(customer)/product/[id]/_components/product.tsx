"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: {
    id: number;
    image_url: string;
  }[];
}

interface RelatedProduct {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

interface ProductClientProps {
  product: Product;
  relatedProducts: RelatedProduct[];
}

export const Product: React.FC<ProductClientProps> = ({
  product,
  relatedProducts,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart, updateQuantity, removeItem } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const incrementQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, -1);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Image
              src={product.images[selectedImage].image_url}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-primary font-bold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center space-x-4 mb-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {cartItem ? (
            <Button
              variant="destructive"
              className="w-full mb-4"
              onClick={() => removeItem(product.id)}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              className="w-full mb-4"
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity,
                  image: product.images[0].image_url,
                });
              }}
            >
              Add to Cart ({quantity})
            </Button>
          )}
          <Button variant="outline" className="w-full">
            Buy Now
          </Button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={{
                id: relatedProduct.id,
                name: relatedProduct.name,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
