/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const useCartMock = jest.fn();
jest.mock("@/context/CartContext", () => ({
  useCart: () => useCartMock(),
}));

import Page from "../page";

describe("Cart page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows empty cart and navigates to products when Start Shopping clicked", () => {
    useCartMock.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<Page />);

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();

    const startBtn = screen.getByRole("button", { name: /Start Shopping/i });
    fireEvent.click(startBtn);

    expect(pushMock).toHaveBeenCalledWith("/products");
  });

  it("renders items and supports quantity update, remove, clear and checkout navigation", () => {
    const removeItem = jest.fn();
    const updateQuantity = jest.fn();
    const clearCart = jest.fn();

    const items = [
      {
        id: 10,
        title: "Cart Item",
        price: 50,
        images: ["/img.png"],
        quantity: 2,
      },
    ];

    useCartMock.mockReturnValue({
      items,
      totalItems: 2,
      totalPrice: 100,
      removeItem,
      updateQuantity,
      clearCart,
    });

    render(<Page />);

    expect(screen.getByText("Cart Item")).toBeInTheDocument();

    // the quantity is the sibling of the minus button; locate minus and inspect its next sibling
    const minus = screen.getByText("−");
    const qtySpan = minus.nextElementSibling as HTMLElement;
    expect(qtySpan).toHaveTextContent("2");

    // click minus
    fireEvent.click(minus);
    expect(updateQuantity).toHaveBeenCalledWith(10, 1);

    // click plus
    const plus = screen.getByText("+");
    fireEvent.click(plus);
    expect(updateQuantity).toHaveBeenCalledWith(10, 3);

    // remove item (button has title "Remove item")
    const removeBtn = screen.getByTitle("Remove item");
    fireEvent.click(removeBtn);
    expect(removeItem).toHaveBeenCalledWith(10);

    // clear cart
    const clearBtn = screen.getByRole("button", { name: /Clear Cart/i });
    fireEvent.click(clearBtn);
    expect(clearCart).toHaveBeenCalled();

    // proceed to checkout
    const checkoutBtn = screen.getByRole("button", {
      name: /Proceed to Checkout/i,
    });
    fireEvent.click(checkoutBtn);
    expect(pushMock).toHaveBeenCalledWith("./checkout");
  });
});
