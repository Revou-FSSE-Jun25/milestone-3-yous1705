"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "@/lib/useCart";

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-50">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-xl font-bold text-blue-700 hover:text-blue-900 transition"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-lg text-gray-700 hover:text-blue-700 transition"
        >
          Produk
        </Link>
        <Link
          href="/cart"
          className="relative text-gray-700 hover:text-blue-700"
        >
          🛒 Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
