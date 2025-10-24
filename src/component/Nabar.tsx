"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { isAuthenticated, logout } from "@/lib/auth";
import { useState, useEffect } from "react";

function Nabar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [auth, setAuth] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const hiddenPaths = ["/", "/login", "/admin/login"];

  const isAdminPage = pathname.startsWith("/admin");

  if (hiddenPaths.includes(pathname)) {
    return null;
  }
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout(router);
    } catch (error) {
      setError("Failed to logout");
      setIsLoggingOut(false);
    }
  };
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
            <span className="text-2xl">🛍️</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            RevoShop
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Tampilkan Products & Cart hanya jika BUKAN halaman admin */}
          {!isAdminPage && (
            <>
              <Link
                href="/products"
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium relative group"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link href="/products/cart" className="relative group">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">
                  <span className="text-2xl">🛒</span>
                  <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                    Cart
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full px-2.5 py-1 shadow-md">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </>
          )}

          {/* Tombol Logout */}
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-medium transition-all shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nabar;
