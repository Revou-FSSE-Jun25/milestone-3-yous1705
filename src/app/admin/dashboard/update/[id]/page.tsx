"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/type";
import { isAuthenticated } from "@/lib/auth";

function page() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    price: 0,
    description: "",
    images: [],
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await api.getProductDetail(id as string);
      setProduct(response);
      setFormData({
        title: response.title,
        price: response.price,
        description: response.description,
        images: response.images,
      });
    } catch (error: any) {
      setError("failded to load product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setError("");

    try {
      const updateProduct = {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        images: formData.images,
      };
      await api.updateProduct(Number(id), updateProduct);
      alert("Product updated successfully");
      router.push("/admin/dashboard");
    } catch {
      setError("Failed to update product");
    } finally {
      setSaved(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200 transition-all duration-300 p-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 flex items-center gap-3">
          ✏️ <span>Update Product</span>
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold text-slate-800">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-semibold text-slate-800">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold text-slate-800">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write short description..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 resize-none"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block mb-2 font-semibold text-slate-800">
              Images
            </label>

            {formData.images?.map((img, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-200"
              >
                <input
                  type="text"
                  value={img}
                  onChange={(e) => {
                    const newImages = [...(formData.images || [])];
                    newImages[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, images: newImages }));
                  }}
                  placeholder={`Image URL #${index + 1}`}
                  className="flex-1 p-2 rounded-lg bg-white border border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-500"
                />

                {img && (
                  <img
                    src={img}
                    alt={`preview-${index}`}
                    className="w-12 h-12 object-cover rounded-lg border border-slate-300"
                  />
                )}

                <button
                  type="button"
                  onClick={() => {
                    const filtered = (formData.images || []).filter(
                      (_, i) => i !== index
                    );
                    setFormData((prev) => ({ ...prev, images: filtered }));
                  }}
                  className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  images: [...(prev.images || []), ""],
                }))
              }
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-md transition-all"
            >
              ➕ Add Image
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saved}
              className={`w-full px-6 py-3 rounded-xl text-white font-semibold shadow-md transition-all ${
                saved
                  ? "bg-gradient-to-r from-blue-400 to-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02]"
              }`}
            >
              {saved ? "Saving..." : "Update Product"}
            </button>
            <button
              className="w-full px-6 py-3 rounded-xl text-white font-semibold shadow-md transition-all bg-gradient-to-r from-blue-400 to-indigo-400"
              type="button"
              onClick={() => router.back()}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
