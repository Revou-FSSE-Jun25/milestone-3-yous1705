"use client";
import { useRouter } from "next/navigation";
import { Product } from "@/type";
import { useCart } from "@/context/CartContext";
import ProductImageCarousel from "@/component/ProductImageCarousel";

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
}

export default function ProductDetail({
  product,
  allProducts,
}: ProductDetailProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.category?.name === product?.category?.name &&
        item.id !== product?.id
    )
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 flex flex-col">
      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden p-6 mb-10">
          {/* Gambar */}
          <div className="w-full">
            <ProductImageCarousel images={product.images} />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3 text-slate-900">
                {product.title}
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {product.description}
              </p>
              <p className="text-sm text-slate-500 mb-1">
                Category:{" "}
                <span className="font-medium text-slate-800">
                  {product.category?.name || "-"}
                </span>
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => addItem(product)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium transition-all"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Related Products
          </h2>
          {relatedProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/products/${item.id}`)}
                  className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-slate-200 hover:-translate-y-1 transition-all"
                >
                  <img
                    src={item.images?.[0] || "/no-image.png"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-semibold">
                        ${item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/products/${item.id}`);
                        }}
                        className="px-3 py-1 rounded-lg text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              No related products found for this category.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Kominfo Store. All rights reserved.
      </footer>
    </div>
  );
}
