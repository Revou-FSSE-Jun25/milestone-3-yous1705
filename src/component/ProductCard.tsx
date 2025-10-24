"use client";
import React from "react";
import { Product } from "@/type";
import { useRouter } from "next/navigation";
import { ProductCardProps } from "@/type";
import { useCart } from "@/context/CartContext";

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden border border-slate-200 transition-all duration-300 group">
      {/* Klik area produk */}
      <div onClick={() => router.push(`/products/${product.id}`)}>
        <div className="relative overflow-hidden aspect-square cursor-pointer">
          <img
            src={product.images?.[0] || "/no-image.png"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1.5 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            Quick View
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 line-clamp-1 text-slate-900 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
      <div className="px-5 pb-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ${product.price.toLocaleString()}
        </span>
        <button
          onClick={() => addItem(product)}
          className="px-5 py-2.5 rounded-xl text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          <span>🛒</span>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
