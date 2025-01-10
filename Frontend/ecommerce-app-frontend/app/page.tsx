'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ProductCard from '../components/product-card'

const categories = [
  { name: 'Electronics', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Clothing', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Home & Garden', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Sports & Outdoors', image: '/placeholder.svg?height=200&width=200' },
]

const featuredProducts = [
  { id: 1, name: 'Featured Product 1', price: 99.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Featured Product 2', price: 129.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Featured Product 3', price: 79.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 4, name: 'Featured Product 4', price: 149.99, image: '/placeholder.svg?height=300&width=300' },
]

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-secondary  py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to AmazingShop</h1>
            <p className="text-xl md:text-2xl mb-8">Discover amazing products at unbeatable prices</p>
            <Link
              href="/shop"
              className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/categories/${category.name.toLowerCase()}`} className="block group">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
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
  )
}

