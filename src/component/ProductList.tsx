import React, { useState } from "react";
import { useFetchData } from "@/lib/useFetchData";
import { ProductData } from "@/types/product";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

function ProductList() {
  const { products, loading, error } = useFetchData();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item: ProductData) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 text-center">
          Products
        </h2>

        <SearchBar value={search} onChange={setSearch} />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((item: ProductData) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Produk tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
