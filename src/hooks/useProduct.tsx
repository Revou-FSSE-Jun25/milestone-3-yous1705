"use client";

import { useEffect, useState } from "react";
import { Product } from "@/type";
import { api } from "@/lib/api";

// Simple in-memory product cache map
const productCache: Record<string, Product> = {};
const productFetchedAt: Record<string, number> = {};
const CACHE_TTL = 60 * 1000; // 60s

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(
    id && productCache[id] ? productCache[id] : null
  );
  const [loading, setLoading] = useState<boolean>(!product);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    const needsFetch =
      !productCache[id] || Date.now() - (productFetchedAt[id] || 0) > CACHE_TTL;

    if (needsFetch) {
      setLoading(true);
      api
        .getProductDetail(id)
        .then((res: Product) => {
          productCache[id] = res;
          productFetchedAt[id] = Date.now();
          if (mounted) setProduct(res);
        })
        .catch((err: any) => {
          if (mounted) setError(err?.message || "Failed to load product");
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const refetch = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.getProductDetail(id);
      productCache[id] = res;
      productFetchedAt[id] = Date.now();
      setProduct(res);
    } catch (err: any) {
      setError(err?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, refetch };
}
