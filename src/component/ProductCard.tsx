import React from "react";
import Link from "next/link";
import { ProductData } from "@/types/product";

function ProductCard({ product }: { product: ProductData }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
    </Link>
  );
}

export default ProductCard;
