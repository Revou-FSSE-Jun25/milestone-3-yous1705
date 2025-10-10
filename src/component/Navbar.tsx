"use client";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
    <Link href="/">Home</Link> 
    <Link href='/products'> Produk </Link>   
    </nav>
  )
}

export default Navbar