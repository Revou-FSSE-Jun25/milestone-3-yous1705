import Product from "./product";

interface ProductDetailPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();

  return products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetailPage(props: ProductDetailPageProps) {
  const { id } = props.params;

  return <Product id={id} />;
}
