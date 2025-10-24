import { api } from "@/lib/api";
import ProductDetail from "./ProductDetail";

export async function generateStaticParams() {
  try {
    const products = await api.getProduct();
    return products.map((p: any) => ({ id: p.id.toString() }));
  } catch {
    return [{ id: "1" }];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await api.getProductDetail(id);
  const allProducts = await api.getProduct();

  return <ProductDetail product={product} allProducts={allProducts} />;
}
