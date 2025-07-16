"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

export default function LessonProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sortBy, setSortBy] = useState<string>("default");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();
      setProducts(data);
      setSortedProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sorted = [...products];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sorted = products;
    }

    setSortedProducts(sorted);
    setVisibleCount(10); // Reset visible count when sorting
  }, [sortBy, products]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        🔥 Promotional products
      </h1>

      {/* Sort Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-az">Name: A to Z</option>
          <option value="name-za">Name: Z to A</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sortedProducts.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < sortedProducts.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            See more products
          </button>
        </div>
      )}
    </div>
  );
}
