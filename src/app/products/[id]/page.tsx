import Product from "./product";

export async function generateStaticParams() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();

  return products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Product id={id} />;
}
