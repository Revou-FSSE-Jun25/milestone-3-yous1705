"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/type";
import { api } from "@/lib/api";

function UpdateProductPage({ product }: { product: Product }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    images: product.images || [],
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

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
      await api.updateProduct(product.id, formData);
      alert("Product updated successfully!");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    } finally {
      setSaved(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 flex items-center gap-3">
          ✏️ Update Product
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-slate-800">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-slate-800">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-slate-800">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 h-28 focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-800">
              Images
            </label>
            {formData.images.map((img, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-900"
              >
                <input
                  type="text"
                  value={img}
                  onChange={(e) => {
                    const newImages = [...formData.images];
                    newImages[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, images: newImages }));
                  }}
                  placeholder={`Image URL #${index + 1}`}
                  className="flex-1 p-2 rounded-lg bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500"
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
                    const filtered = formData.images.filter(
                      (_, i) => i !== index
                    );
                    setFormData((prev) => ({ ...prev, images: filtered }));
                  }}
                  className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium"
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
                  images: [...prev.images, ""],
                }))
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md"
            >
              ➕ Add Image
            </button>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={saved}
              className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold shadow-md ${
                saved
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saved ? "Saving..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 rounded-xl text-white font-semibold bg-gray-400 hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductPage;
