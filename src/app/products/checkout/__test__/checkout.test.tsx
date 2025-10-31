/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

describe("Checkout page", () => {
  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    localStorage.clear();
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  it("shows empty cart page and navigates to products when Lanjutkan Belanja clicked", () => {
    useCartMock.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      clearCart: jest.fn(),
    });

    render(<Page />);

    // In empty state the page shows a 'Lanjutkan Belanja →' button that navigates to /products
    const continueBtn = screen.getByRole("button", {
      name: /Lanjutkan Belanja/i,
    });
    fireEvent.click(continueBtn);

    expect(pushMock).toHaveBeenCalledWith("/products");
  });

  it("shows validation alert when form not filled", () => {
    useCartMock.mockReturnValue({
      items: [{ id: 1, title: "A", price: 10, quantity: 1 }],
      totalItems: 1,
      totalPrice: 10,
      clearCart: jest.fn(),
    });

    render(<Page />);

    const placeBtn = screen.getByRole("button", { name: /Place Order/i });
    fireEvent.click(placeBtn);

    expect(alertSpy).toHaveBeenCalledWith(
      "Please fill in all the required fields"
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("places order when form is valid: saves to localStorage, clears cart and redirects", async () => {
    const clearCart = jest.fn();
    useCartMock.mockReturnValue({
      items: [{ id: 2, title: "B", price: 20, quantity: 2 }],
      totalItems: 2,
      totalPrice: 40,
      clearCart,
    });

    render(<Page />);

    const nameInput = screen.getByPlaceholderText(/Nama Lengkap/i);
    const addressInput = screen.getByPlaceholderText(/Alamat Pengiriman/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(addressInput, { target: { value: "Some Address" } });

    const placeBtn = screen.getByRole("button", { name: /Place Order/i });
    fireEvent.click(placeBtn);

    await waitFor(() => expect(clearCart).toHaveBeenCalled());
    expect(alertSpy).toHaveBeenCalledWith("Order placed successfully");
    expect(pushMock).toHaveBeenCalledWith("/products");

    // orders stored in localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThanOrEqual(1);
    expect(orders[orders.length - 1]).toHaveProperty("customer", "John Doe");
  });
});
