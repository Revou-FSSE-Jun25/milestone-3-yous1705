# RevoShop E-commerce Project

A modern e-commerce application built with Next.js and TypeScript, featuring user and admin interfaces for product management and shopping.

## Technologies Used

- **Next.js 13** - React framework with App Router
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For styling and responsive design
- **React Context** - For state management (Shopping cart)
- **Local Storage** - For persistent cart data
- **JWT Authentication** - For secure user sessions
- **External APIs**:
  - Products API: [EscuelaJS API](https://api.escuelajs.co/api/v1/products)
  - Auth API: [DummyJSON](https://dummyjson.com/auth/login)

---

## Pages & Routes

### Public Routes

- `/` - Landing page with user/admin login options
- `/login` - User login page
- `/admin/login` - Admin login page

### User Routes

- `/products` - Product listing page with search functionality
- `/products/[id]` - Product detail page
- `/products/cart` - Shopping cart page
- `/products/checkout` - Order checkout page

### Admin Routes

- `/admin/dashboard` - Product management dashboard
- `/admin/dashboard/create` - Create new product
- `/admin/dashboard/update/[id]` - Update existing product

---

## Features

### User Features

- Product browsing with search functionality
- Image carousel for product images
- Shopping cart management
- Checkout process
- Responsive design for all devices

### Admin Features

- Product management (CRUD operations)
- Dashboard with product listing
- Search and filter products

## Project Structure

```
milestone-3-yous1705/
├── public/
├── src/
│   ├── app/               # Next.js 13 app router pages
│   │   ├── admin/         # Admin-related pages
│   │   │   ├── dashboard/ # Product management
│   │   │   └── login/     # Admin login
│   │   ├── login/         # User login
│   │   └── products/      # Product pages
│   │   │   ├── [id]/      # Product detail
│   │   │   └── cart/      # User Cart
│   │   │   └── checkout/  # Product checkout
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductImageCarousel.tsx
│   │   ├── ProductList.tsx
│   │   └── SearchBar.tsx
│   ├── context/          # React Context
│   │   └── CartContext.tsx
│   ├── lib/             # Utilities
│   │   ├── api.tsx      # API functions
│   │   └── auth.tsx     # Auth helpers
│   └── types/           # TypeScript types
├── next.config.ts       # Next.js config
└── tsconfig.json        # TypeScript config
```

---

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Test Accounts

### Admin Account

- Username: logant
- Password: logantpass

### User Account

- Username: emilys
- Password: emilyspass

## Live Webserver

➡️ [https://revou-fsse-jun25.github.io/milestone-3-yous1705/](https://revou-fsse-jun25.github.io/milestone-3-yous1705/)

## Contact

Email: [youssibarani17@gmail.com](mailto:youssibarani17@gmail.com)
