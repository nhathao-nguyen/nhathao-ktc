"use client";

import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

export default function Lesson13Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Image
        src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/bd/26/bd260331dfc577627b0c955e027cdaba.png"
        alt=""
        width={1920}
        height={200}
        className="w-full h-auto object-cover mb-4"
      />
      {/* Navbar */}
      <nav className="sticky top-[72px] z-40 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link
                href="/lesson13"
                className="text-xl font-bold text-blue-600"
              >
                🛍️ Logo Here
              </Link>
            </div>

            {/* Search bar */}
            <div className="flex-1 mx-6 hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-sm text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 font-medium transition"
              >
                🛒
                <span>Cart</span>
                <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
