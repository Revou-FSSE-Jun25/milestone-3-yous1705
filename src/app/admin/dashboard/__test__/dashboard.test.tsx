/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// router mock
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// api mock
const getProductMock = jest.fn();
const deleteProductMock = jest.fn();
jest.mock("@/lib/api", () => ({
  api: {
    getProduct: getProductMock,
    deleteProduct: deleteProductMock,
  },
}));

import Page from "../page";

describe("Admin Dashboard Page", () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Desc 1",
      images: ["/img1.png"],
      category: { id: 1, name: "Cat 1" },
      slug: 1,
      quantity: 1,
    },
    {
      id: 2,
      title: "Other Product",
      price: 200,
      description: "Desc 2",
      images: ["/img2.png"],
      category: { id: 2, name: "Cat 2" },
      slug: 2,
      quantity: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getProductMock.mockResolvedValue(products);
    deleteProductMock.mockResolvedValue({});
  });

  it("renders products and shows total count", async () => {
    render(<Page />);

    // wait until the product title appears (loading finishes)
    await waitFor(() =>
      expect(screen.getByText("Product 1")).toBeInTheDocument()
    );

    expect(screen.getByText("Other Product")).toBeInTheDocument();
    expect(screen.getByText(/Total Products:/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("navigates to create page when Create Product clicked", async () => {
    render(<Page />);
    await waitFor(() =>
      expect(screen.getByText("Product 1")).toBeInTheDocument()
    );

    const createBtn = screen.getByRole("button", { name: /Create Product/i });
    fireEvent.click(createBtn);

    expect(pushMock).toHaveBeenCalledWith("/admin/dashboard/create");
  });

  it("navigates to update page when Edit clicked", async () => {
    render(<Page />);
    await waitFor(() =>
      expect(screen.getByText("Product 1")).toBeInTheDocument()
    );

    const editButtons = screen.getAllByRole("button", { name: /Edit/i });
    fireEvent.click(editButtons[0]);

    expect(pushMock).toHaveBeenCalledWith(`/admin/dashboard/update/1`);
  });

  it("deletes product when Delete clicked and confirmed", async () => {
    // mock confirm to return true
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    render(<Page />);
    await waitFor(() =>
      expect(screen.getByText("Product 1")).toBeInTheDocument()
    );

    const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => expect(deleteProductMock).toHaveBeenCalledWith(1));

    // After deletion, the product title should no longer be in the document
    await waitFor(() =>
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument()
    );
  });

  it("filters products when searching", async () => {
    render(<Page />);
    await waitFor(() =>
      expect(screen.getByText("Product 1")).toBeInTheDocument()
    );

    const input = screen.getByPlaceholderText(/Cari produk/i);
    fireEvent.change(input, { target: { value: "Other" } });
    const searchBtn = screen.getByRole("button", { name: /Cari/i });
    fireEvent.click(searchBtn);

    // wait until the filtered results appear
    await waitFor(() =>
      expect(screen.getByText("Other Product")).toBeInTheDocument()
    );
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });
});
