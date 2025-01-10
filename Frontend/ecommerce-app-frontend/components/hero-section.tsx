"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary  py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to AmazingShop
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <Link
            href="/shop"
            className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
