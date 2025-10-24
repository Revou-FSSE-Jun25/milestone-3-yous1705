"use client";
import React from "react";
import { Product } from "@/type";
import ProductCard from "./ProductCard";
import { ProductListProps } from "@/type";

function ProductList({ products }: ProductListProps) {
  return (
    <div className="w-full">
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full p-8 mb-6">
            <span className="text-7xl">🔍</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Tidak ada produk ditemukan
          </h3>
          <p className="text-slate-600 text-center max-w-md">
            Kami tidak dapat menemukan produk yang sesuai dengan pencarian Anda.
            Coba sesuaikan kata kunci pencarian.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
