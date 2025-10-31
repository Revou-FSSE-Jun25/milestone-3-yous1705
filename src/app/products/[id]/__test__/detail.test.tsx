/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mocks for next/navigation
const pushMock = jest.fn();
const backMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, back: backMock }),
}));

// Mock useCart from CartContext
const addItemMock = jest.fn();
jest.mock("@/context/CartContext", () => ({
  useCart: () => ({ addItem: addItemMock }),
}));

import ProductDetail from "../ProductDetail";
import { Product } from "@/type";

describe("ProductDetail component", () => {
  const product: Product = {
    id: 1,
    title: "Test Product",
    price: 12345,
    description: "A product for testing",
    images: ["https://example.com/img1.jpg"],
    category: { id: 10, name: "Gadgets" },
    slug: 1,
    quantity: 5,
  };

  const relatedSameCategory: Product = {
    id: 2,
    title: "Related Product",
    price: 999,
    description: "Related item",
    images: ["https://example.com/img2.jpg"],
    category: { id: 10, name: "Gadgets" },
    slug: 2,
    quantity: 2,
  };

  const otherCategory: Product = {
    id: 3,
    title: "Other Product",
    price: 111,
    description: "Other category item",
    images: ["https://example.com/img3.jpg"],
    category: { id: 20, name: "Books" },
    slug: 3,
    quantity: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product info and Add to Cart / Back buttons", () => {
    render(
      <ProductDetail
        product={product}
        allProducts={[relatedSameCategory, otherCategory]}
      />
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    // Ensure category is rendered (price formatting may vary by locale)
    expect(screen.getByText(/Category:/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add to Cart/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("calls addItem when Add to Cart is clicked", () => {
    render(
      <ProductDetail product={product} allProducts={[relatedSameCategory]} />
    );

    const addBtn = screen.getByRole("button", { name: /Add to Cart/i });
    fireEvent.click(addBtn);

    expect(addItemMock).toHaveBeenCalledTimes(1);
    expect(addItemMock).toHaveBeenCalledWith(product);
  });

  it("navigates back when Back is clicked", () => {
    render(<ProductDetail product={product} allProducts={[]} />);

    const backBtn = screen.getByRole("button", { name: /Back/i });
    fireEvent.click(backBtn);

    expect(backMock).toHaveBeenCalledTimes(1);
  });

  it("shows related products from same category and navigates to product page on View", () => {
    render(
      <ProductDetail
        product={product}
        allProducts={[relatedSameCategory, otherCategory]}
      />
    );

    // Related product (same category) should be visible
    expect(screen.getByText(relatedSameCategory.title)).toBeInTheDocument();

    // Click the 'View' button on related product
    const viewBtn = screen.getByRole("button", { name: /View/i });
    fireEvent.click(viewBtn);

    expect(pushMock).toHaveBeenCalledWith(
      `/products/${relatedSameCategory.id}`
    );
  });
});
