"use client";
import React from "react";
import { useCart } from "@/lib/useCart";
import { XMarkIcon } from "@heroicons/react/24/outline";

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Keranjang Belanja
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Keranjang masih kosong.</p>
        ) : (
          <>
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={
                        Array.isArray(item.images)
                          ? item.images[0]
                          : item.images
                      }
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.title}</h3>
                      <p className="ml-4">Rp {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm mt-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <span>Qty:</span>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, Number(e.target.value))
                          }
                          className="w-16 border rounded text-center"
                        />
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                      >
                        <XMarkIcon className="h-5 w-5" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>$ {totalPrice.toLocaleString()}</p>
              </div>
              <div className="mt-6">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium shadow-sm">
                  Checkout
                </button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                <a
                  href="/products"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ← Lanjut Belanja
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
