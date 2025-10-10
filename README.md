# E-Commerce App

A simple e-commerce application built with **Next.js**, **React**, and **Tailwind CSS**.  
This app displays a product list, product details, a shopping cart feature, and static pages.

---

## 🚀 Technologies Used

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **LocalStorage** (cart persistence)
- **Fake Store API** (using [EscuelaJS API](https://api.escuelajs.co/api/v1/products) for products)

---

## 📦 Libraries & Tools

- `next`
- `react`
- `tailwindcss`
- `typescript`

---

## 📄 Pages

| Path             | Description                            |
| ---------------- | -------------------------------------- |
| `/`              | Home page with User/Admin login option |
| `/products`      | Product listing page                   |
| `/products/[id]` | Product detail page                    |
| `/cart`          | Shopping cart page                     |

---

## ✨ Features

- **Product Listing:**  
  Displays a grid of products with images, names, and prices.

- **Product Detail:**  
  Shows detailed information about a product (image, name, description, price).

- **Add to Cart:**  
  Add products to the cart directly from the listing page.

- **Shopping Cart:**  
  View added products, update quantity, remove items, and see total price.

- **Cart Persistence:**  
  Cart data remains saved even after refreshing the page (via localStorage).

- **Dynamic Navbar:**  
  Displays a badge with the number of products in the cart.

- **Responsive Design:**  
  Fully responsive layout for various screen sizes.

---

## 📂 Main Folder Structure

```
src/
  app/
    page.tsx           // Home
    products/
      page.tsx         // Product Listing
      [id]/
        page.tsx       // Product Detail
    cart/
      page.tsx         // Cart
  component/
    Navbar.tsx
    Footer.tsx
    ProductList.tsx
    ProductCard.tsx
    SearchBar.tsx
  lib/
    useCart.tsx
    useFetchData.tsx
  types/
    product.ts
```

---

## ✨ Features

- **Product Listing:**  
  Displays a grid of products with images, names, and prices.

- **Product Detail:**  
  Shows detailed information about a product (image, name, description, price).

- **Add to Cart:**  
  Add products to the cart directly from the listing page.

- **Shopping Cart:**  
  View added products, update quantity, remove items, and see total price.

- **Cart Persistence:**  
  Cart data remains saved even after refreshing the page (via localStorage).

- **Dynamic Navbar:**  
  Displays a badge with the number of products in the cart.

- **Responsive Design:**  
  Fully responsive layout for various screen sizes.

---

## Kontak

## Email: [youssibarani17@gmail.com](mailto:youssibarani17@gmail.com)
