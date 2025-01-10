"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          AmazingShop
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Home
          </Link>
          <Link href="/shop" className="text-gray-600 hover:text-primary">
            Shop
          </Link>
          <Link href="/categories" className="text-gray-600 hover:text-primary">
            Categories
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="text-gray-600 hover:text-primary relative"
          >
            <ShoppingCart />
            {cartItemsCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Link>
          <button
            className="md:hidden text-gray-600 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-md py-2"
        >
          <Link
            href="/"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Shop
          </Link>
          <Link
            href="/categories"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Categories
          </Link>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
