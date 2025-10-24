"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

function page() {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-7xl mb-4">🛍️</div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-500 mb-6">
              Looks like you haven’t added anything yet.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              🛒 Start Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="divide-y divide-slate-200">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images?.[0] || "/no-image.png"}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl border border-slate-200"
                    />
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        {item.title}
                      </h2>
                      <p className="text-slate-500 text-sm">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 bg-slate-200 hover:bg-slate-300 rounded transition"
                        >
                          −
                        </button>
                        <span className="text-slate-800 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 bg-slate-200 hover:bg-slate-300 rounded transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                    title="Remove item"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 border-t border-slate-200 pt-6">
              <div className="text-slate-700 text-sm">
                <p>
                  Total items:{" "}
                  <span className="font-semibold">{totalItems}</span>
                </p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  Total: ${totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium transition-all"
                >
                  🧹 Clear Cart
                </button>
                <button
                  onClick={() => router.push("./checkout")}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  ✅ Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Kominfo Store. All rights reserved.
      </footer>
    </div>
  );
}

export default page;
