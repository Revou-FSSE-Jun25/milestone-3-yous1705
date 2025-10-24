"use client";
import React, { useState } from "react";
import { SearchBarProps } from "@/type";

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-2xl mx-auto bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl focus-within:border-blue-500 transition-all duration-300"
    >
      <span className="pl-5 pr-3 text-blue-600 text-xl select-none">🔍</span>

      <input
        type="text"
        placeholder="Cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none px-2 py-4 text-base focus:ring-0"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 transition-all duration-300 hover:shadow-lg"
      >
        Cari
      </button>
    </form>
  );
}

export default SearchBar;
