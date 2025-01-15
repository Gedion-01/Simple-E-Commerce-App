"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
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
        <Link
          href="/admin/dashboard"
          className="text-2xl font-bold text-primary"
        >
          Admin Dashboard
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link
            href="/admin/products"
            className={getLinkClass("/admin/products")}
          >
            Products
          </Link>
          <Link href="/admin/orders" className={getLinkClass("/admin/orders")}>
            Orders
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-600 hover:text-primary">
                  <User className="h-8" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
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
        <div className="md:hidden bg-white shadow-md py-2">
          <Link
            href="/admin/dashboard"
            className={`block px-4 py-2 ${getLinkClass("/admin/dashboard")}`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className={`block px-4 py-2 ${getLinkClass("/admin/products")}`}
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className={`block px-4 py-2 ${getLinkClass("/admin/orders")}`}
          >
            Orders
          </Link>
        </div>
      )}
    </header>
  );
}

export default AdminHeader;
