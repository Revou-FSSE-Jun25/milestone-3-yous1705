"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "@/component/SearchBar";
import ProductList from "@/component/ProductList";
import { useProducts } from "@/hooks/useProducts";

export default function ProductPage() {
  const router = useRouter();
  const { products, loading, error, refetch } = useProducts();
  const [searchProduct, setSearchProduct] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    if (query === "") {
      setSearchProduct(products);
      return;
    }

    const result = products.filter((item: any) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchProduct(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Produk
          </h1>
        </div>
      </header>

      {/* Main */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Product List */}
          <ProductList
            products={searchProduct.length > 0 ? searchProduct : products}
          />
        </div>
      </main>
    </div>
  );
}
