/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../create/page";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";

// 🧩 Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  api: {
    getAllCategories: jest.fn(),
    createProduct: jest.fn(),
  },
}));

jest.mock("@/lib/auth", () => ({
  isAuthenticated: jest.fn(),
}));

describe("Create Product Page", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (isAuthenticated as jest.Mock).mockReturnValue(true);
    // Default: mock categories
    (api.getAllCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: "Test Category" },
    ]);
  });

  it("renders form fields correctly", async () => {
    render(<Page />);

    // Tunggu categories dimuat
    await waitFor(() => expect(api.getAllCategories).toHaveBeenCalledTimes(1));

    expect(
      screen.getByRole("heading", { name: /Create New Product/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter product title/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter price/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter product description/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows validation error when submitting empty form", async () => {
    render(<Page />);
    await waitFor(() => expect(api.getAllCategories).toHaveBeenCalled());

    const button = screen.getByRole("button", { name: /Create Product/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });
  });

  it("submits successfully when valid data is provided", async () => {
    (api.createProduct as jest.Mock).mockResolvedValue({ id: 1 });

    render(<Page />);
    await waitFor(() => expect(api.getAllCategories).toHaveBeenCalled());

    // Isi form
    fireEvent.change(screen.getByPlaceholderText(/Enter product title/i), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter price/i), {
      target: { value: "100" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Enter product description/i),
      {
        target: { value: "Nice product" },
      }
    );

    // Pilih kategori
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    // Isi image
    const imageInput = screen.getByPlaceholderText(
      "https://example.com/image1.jpg"
    );
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/pic.jpg" },
    });

    const submitBtn = screen.getByRole("button", { name: /Create Product/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.createProduct).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/admin/dashboard");
    });
  });

  it("adds and removes image inputs correctly", async () => {
    render(<Page />);
    await waitFor(() => expect(api.getAllCategories).toHaveBeenCalled());

    const addBtn = screen.getByRole("button", { name: /Add Another Image/i });
    fireEvent.click(addBtn);

    const inputs = screen.getAllByPlaceholderText(/example.com/i);
    expect(inputs.length).toBeGreaterThan(1);

    const removeBtns = screen.getAllByRole("button", { name: "❌" });
    fireEvent.click(removeBtns[0]);
  });
});
