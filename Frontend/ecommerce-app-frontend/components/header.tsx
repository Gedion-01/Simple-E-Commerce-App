"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "text-primary font-bold"
      : "text-gray-600 hover:text-primary";
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          ShopHaven
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/shop" className={getLinkClass("/shop")}>
            Shop
          </Link>
          <Link href="/orders" className={getLinkClass("/orders")}>
            Orders
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="text-gray-600 hover:text-primary relative"
          >
            <ShoppingCart className="h-8" />
            {cartItemsCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Link>
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-600 hover:text-primary">
                  <User className="h-8" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
          <Link href="/" className={`block px-4 py-2 ${getLinkClass("/")}`}>
            Home
          </Link>
          <Link
            href="/shop"
            className={`block px-4 py-2 ${getLinkClass("/shop")}`}
          >
            Shop
          </Link>
          <Link
            href="/orders"
            className={`block px-4 py-2 ${getLinkClass("/orders")}`}
          >
            Orders
          </Link>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
