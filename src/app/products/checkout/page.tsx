"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

function page() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      router.push("/products/cart");
      return;
    }
    if (!formData.name || !formData.address) {
      alert("Please fill in all the required fields");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: formData.name,
      items,
      totalPrice,
      date: new Date().toISOString(),
    };

    const exisingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem(
      "orders",
      JSON.stringify([...exisingOrders, newOrder])
    );
    clearCart();
    alert("Order placed successfully");
    router.push("/products");
  };
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200 transition-all duration-300 p-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 flex items-center gap-3">
          🧾 <span>Checkout</span>
        </h1>

        {items.length === 0 ? (
          <div className="text-center text-slate-600 py-20">
            <p className="text-lg mb-4">Keranjang belanja Anda kosong.</p>
            <button
              onClick={() => router.push("/products")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Lanjutkan Belanja →
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-5 text-slate-900">
                Ringkasan Pesanan
              </h2>

              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800">
                        {item.title}
                      </span>
                      <span className="text-sm text-slate-500">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="text-slate-800 font-semibold">
                      ${Number(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-slate-200" />
              <p className="text-lg font-bold text-slate-900 flex justify-between">
                <span>Total</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${totalPrice.toLocaleString()}
                </span>
              </p>
            </div>

            {/* 💳 Checkout Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-5 text-slate-900">
                Detail Pembeli
              </h2>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                />

                <textarea
                  name="address"
                  placeholder="Alamat Pengiriman"
                  value={formData.address}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 h-24 resize-none"
                />

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                >
                  <option value="credit-card">💳 Credit Card</option>
                  <option value="bank-transfer">🏦 Bank Transfer</option>
                  <option value="cash-on-delivery">💵 Cash on Delivery</option>
                </select>

                <button
                  onClick={handleCheckout}
                  className="mt-4 px-5 py-3 rounded-xl text-white font-semibold shadow-md transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02]"
                >
                  ✅ Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
