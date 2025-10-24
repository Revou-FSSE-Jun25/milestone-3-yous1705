import { api } from "@/lib/api";
import UpdateProductPage from "./UpdateProductPage";

export async function generateStaticParams() {
  try {
    const products = await api.getProduct();
    return products.map((p: any) => ({ id: p.id.toString() }));
  } catch {
    // fallback agar build tidak gagal kalau API down
    return [{ id: "1" }];
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await api.getProductDetail(params.id);
  return <UpdateProductPage product={product} />;
}
