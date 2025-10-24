"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/type";
import { api } from "@/lib/api";
import SearchBar from "@/component/SearchBar";
import ProductList from "@/component/ProductList";

export default function page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchProduct, setSearchProduct] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.getProduct();
      setProducts(response);
    } catch (error: any) {
      setError("failded to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setSearchProduct(products);
      return;
    }

    const result = products.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchProduct(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="w-full max-w-md mx-auto flex items-center justify-between px-6 py-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-500 text-lg animate-pulse">
              Loading products...
            </p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-red-500 text-lg font-medium">{error}</p>
          </div>
        ) : (
          <ProductList
            products={searchProduct.length > 0 ? searchProduct : products}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Kominfo Store. All rights reserved.
      </footer>
    </div>
  );
}
