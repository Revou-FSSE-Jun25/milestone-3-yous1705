"use client";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4">
      <header className="mb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Pilih Mode Login Anda
        </h1>
        <p className="mt-2 text-gray-500 text-base md:text-lg">
          Masuk sebagai pembeli atau admin toko untuk melanjutkan.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mt-8 w-full max-w-3xl">
        <div
          className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-8 flex flex-col items-center text-center 
                     hover:scale-[1.03] hover:shadow-xl hover:border-blue-200 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-blue-600 text-3xl font-bold">U</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Masuk sebagai User
          </h2>
          <p className="text-gray-500 mb-6">
            Belanja produk favorit Anda dengan mudah dan aman.
          </p>
          <Link
            href="/products"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadowvhover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Masuk Sekarang
          </Link>
        </div>

        {/* Card Admin */}
        <div
          className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center text-center 
                     hover:scale-[1.03] hover:shadow-xl hover:border-gray-300 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-blue-500 text-3xl font-bold">A</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Masuk sebagai Admin
          </h2>
          <p className="text-gray-500 mb-6">
            Kelola toko, produk, dan pesanan dengan dashboard admin.
          </p>
          <Link
            href="/products"
            className="bg-gray-200 text-blue-700 font-semibold px-6 py-2 rounded-lg shadow 
                       hover:bg-gray-100 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Masuk Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
