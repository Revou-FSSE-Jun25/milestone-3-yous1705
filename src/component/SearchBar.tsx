"use client";
import React from 'react'

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({value, onChange}: SearchBarProps) {

  return (
    <div className='flex justify-center mb-8'>
        <input type='text' placeholder='Cari Produk' value={value} onChange={(e) => onChange(e.target.value)} className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" ></input>
    </div>
  )
}

export default SearchBar