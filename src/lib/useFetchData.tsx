import { useState, useEffect } from "react";
import { ProductData } from "@/types/product";

export function useFetchData() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      setError("Failed to fetch product");
      console.error("Error Product:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { products, loading, error };
}
