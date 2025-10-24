import { get } from "http";
import { getCookie } from "./auth";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";
const BASE_URL_LOGIN = "https://dummyjson.com/auth/login";
const BASE_URL_CHECKOUT = "https://api.escuelajs.co/api/v1/orders";

export const api = {
  login: async (username: string, password: string) => {
    const response = await fetch(BASE_URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.json();
  },

  getCurrentUser: async () => {
    const token = getCookie("token");

    const response = await fetch(BASE_URL_LOGIN, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get current user");
    }

    return response.json();
  },

  getProduct: async () => {
    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  getProductDetail: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    return response.json();
  },

  searchProduct: async (query: string) => {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    return response.json();
  },

  updateProduct: async (id: number, updatedData: any) => {
    const token = getCookie("token");

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      let errBody = null;
      try {
        errBody = await response.json();
      } catch {}
      throw new Error(
        errBody?.message || response.statusText || "Update failed"
      );
    }

    return response.json();
  },

  getAllCategories: async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  createProduct: async (productData: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }) => {
    const token = getCookie("token");

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      let errBody = null;
      try {
        errBody = await response.json();
      } catch {}
      throw new Error(
        errBody?.message || response.statusText || "Failed to create product"
      );
    }

    return response.json();
  },

  deleteProduct: async (id: number) => {
    const token = getCookie("token");

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      let errBody = null;
      try {
        errBody = await response.json();
      } catch {}
      throw new Error(
        errBody?.message || response.statusText || "Failed to delete product"
      );
    }
    return response.json();
  },
};
