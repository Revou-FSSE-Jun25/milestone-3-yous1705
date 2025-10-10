"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductData } from "@/types/product";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        const data = await res.json();
        setProduct(data);
      } catch (e: any) {
        setError(e.message || "Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.images}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg mb-6 bg-gray-100"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="text-xl font-semibold text-blue-700 mb-2">${product.price}</div>
      </div>
    </div>
  );
}
