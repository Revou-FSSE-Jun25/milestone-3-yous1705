"use client";

import { useEffect, useState } from "react";
import { Product } from "@/type";
import { api } from "@/lib/api";

// Simple in-memory cache for products (client-side)
let productsCache: Product[] | null = null;
let lastFetched = 0;
const CACHE_TTL = 60 * 1000; // 60s

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(productsCache || []);
  const [loading, setLoading] = useState<boolean>(!productsCache);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const needsFetch = !productsCache || Date.now() - lastFetched > CACHE_TTL;

    if (needsFetch) {
      setLoading(true);
      api
        .getProduct()
        .then((res: Product[]) => {
          productsCache = res;
          lastFetched = Date.now();
          if (mounted) setProducts(res);
        })
        .catch((err: any) => {
          if (mounted) setError(err?.message || "Failed to load products");
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await api.getProduct();
      productsCache = res;
      lastFetched = Date.now();
      setProducts(res);
    } catch (err: any) {
      setError(err?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch };
}
