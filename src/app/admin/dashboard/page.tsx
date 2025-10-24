"use client";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Product } from "@/type";
import { useRouter } from "next/navigation";
import SearchBar from "@/component/SearchBar";

function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [searchProduct, setSearchProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.getProduct();
      setProducts(response);
      setSearchProduct(response);
    } catch (error: any) {
      setError("Failed to load products");
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

  const handleCreate = () => {
    router.push("/admin/dashboard/create");
  };

  const handleUpdate = (id: number) => {
    router.push(`/admin/dashboard/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      setSearchProduct((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      setError("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#E0E0E0]">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 min-h-screen flex justify-center">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            📦 Admin Dashboard
          </h1>
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl text-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all text-white font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
          >
            ➕ <span>Create Product</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* Table Wrapper */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-slate-700">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left font-semibold">Image</th>
                <th className="p-3 text-left font-semibold">Title</th>
                <th className="p-3 text-left font-semibold">Price</th>
                <th className="p-3 text-left font-semibold">Category</th>
                <th className="p-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {searchProduct.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-slate-400 bg-slate-50"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                searchProduct.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 transition-all border-t border-slate-100"
                  >
                    <td className="p-3">
                      <img
                        src={
                          Array.isArray(product.images) && product.images[0]
                            ? product.images[0]
                            : "/no-image.png"
                        }
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                      />
                    </td>
                    <td className="p-3 font-medium">{product.title}</td>
                    <td className="p-3 font-semibold text-slate-800">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-600">
                      {product.category?.name || "N/A"}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(product.id)}
                          className="px-3 py-1.5 rounded-lg text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all shadow-sm hover:shadow-md"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1.5 rounded-lg text-sm bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-medium transition-all shadow-sm hover:shadow-md"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-sm text-slate-500">
          Total Products:{" "}
          <span className="font-semibold text-slate-700">
            {searchProduct.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Page;
