"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";

function page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [formData, setFormData] = useState<{
    title: string;
    price: number | string;
    description: string;
    categoryId?: number;
    images: string[];
  }>({
    title: "",
    price: "",
    description: "",
    categoryId: undefined,
    images: [""],
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await api.getAllCategories();
      setCategories(response);
    } catch (error: any) {
      setError("Failed to load categories");
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
    setIsLoading(true);
    setError("");
    try {
      // Validation
      if (!formData.title.trim()) {
        setError("Title is required");
        setIsLoading(false);
        return;
      }

      if (!formData.price || Number(formData.price) <= 0) {
        setError("Price must be greater than 0");
        setIsLoading(false);
        return;
      }

      if (!formData.description.trim()) {
        setError("Description is required");
        setIsLoading(false);
        return;
      }

      if (!formData.categoryId) {
        setError("Please select a category");
        setIsLoading(false);
        return;
      }

      const validImages = formData.images.filter((img) => img.trim() !== "");
      if (validImages.length === 0) {
        setError("At least one image URL is required");
        setIsLoading(false);
        return;
      }

      const createPayload = {
        title: formData.title.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        categoryId: Number(formData.categoryId),
        images: validImages,
      };

      // Debug logs: only print when not running tests to avoid noisy test output
      if (process.env.NODE_ENV !== "test") {
        console.log("=== CREATE PAYLOAD ===");
        console.log("Payload:", JSON.stringify(createPayload, null, 2));
      }

      const response = await api.createProduct(createPayload);

      if (process.env.NODE_ENV !== "test") {
        console.log("=== CREATE RESPONSE ===");
        console.log("Response:", JSON.stringify(response, null, 2));
      }

      alert("✅ Product created successfully!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      // Avoid noisy test output; log only outside of tests
      if (process.env.NODE_ENV !== "test") {
        console.error("=== CREATE ERROR ===", err);
      }
      setError(err.message || "❌ Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ➕ Create New Product
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* Form Wrapper */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold text-slate-800">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-semibold text-slate-800">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold text-slate-800">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="w-full p-3 h-28 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none placeholder:text-slate-400 text-slate-800"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-semibold text-slate-800">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.categoryId ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: Number(e.target.value) || undefined,
                  }))
                }
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
              >
                <option className="text-slate-800" value="">
                  -- Select Category --
                </option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
            </div>

            {/* Images */}
            <div>
              <label className="block mb-2 font-semibold text-slate-800">
                Images <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-slate-500 mb-3">
                Add at least one image URL for your product.
              </p>

              {formData.images.map((img, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`https://example.com/image${index + 1}.jpg`}
                    className="flex-1 p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 text-slate-800"
                  />
                  {img && img.startsWith("http") && (
                    <img
                      src={img}
                      alt={`preview-${index}`}
                      className="w-12 h-12 object-cover rounded-lg border border-slate-200 shadow-sm"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    disabled={formData.images.length === 1}
                    className="px-3 py-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-xl shadow-sm transition-all disabled:opacity-50"
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md transition-all"
              >
                ➕ Add Another Image
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Product"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
                className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-all shadow-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
