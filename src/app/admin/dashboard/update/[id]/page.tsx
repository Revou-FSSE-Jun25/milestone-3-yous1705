import { api } from "@/lib/api";
import UpdateProductPage from "./UpdateProductPage";

export async function generateStaticParams() {
  try {
    const products = await api.getProduct();
    return products.map((p: any) => ({ id: p.id.toString() }));
  } catch {
    return [{ id: "1" }];
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params; // tidak perlu await
  const product = await api.getProductDetail(id);
  return <UpdateProductPage product={product} />;
}
