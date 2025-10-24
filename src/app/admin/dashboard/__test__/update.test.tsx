import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Page from "../update/[id]/UpdateProductPage";
import { Product } from "@/type";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock("@/lib/api", () => ({
  api: {
    updateProduct: jest.fn().mockResolvedValue({}),
  },
}));

beforeAll(() => {
  window.alert = jest.fn();
});

describe("🧪 Update Product Page (with props)", () => {
  // lengkapkan mockProduct sesuai interface Product
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 5000,
    description: "A product used for testing",
    images: [],
    category: {
      id: 1,
      name: "Test Category",
    },
    slug: 1, // sesuai tipe kamu slug: number
    quantity: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with product props", async () => {
    await act(async () => {
      render(<Page product={mockProduct} />);
    });

    const heading = await screen.findByRole("heading", {
      name: /Update Product/i,
    });
    expect(heading).toBeInTheDocument();

    expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5000")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("A product used for testing")
    ).toBeInTheDocument();
  });

  it("updates form field values when typing", async () => {
    await act(async () => {
      render(<Page product={mockProduct} />);
    });

    const titleInput = screen.getByDisplayValue("Test Product");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    expect(titleInput).toHaveValue("Updated Title");
  });

  it("shows error message if API update fails", async () => {
    const { api } = await import("@/lib/api");
    (api.updateProduct as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    await act(async () => {
      render(<Page product={mockProduct} />);
    });

    const button = screen.getByRole("button", { name: /Update Product/i });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/Failed to update product/i)).toBeInTheDocument()
    );
  });

  it("adds new image input when clicking 'Add Image'", async () => {
    await act(async () => {
      render(<Page product={mockProduct} />);
    });

    const addButton = screen.getByRole("button", { name: /Add Image/i });
    fireEvent.click(addButton);

    expect(screen.getByPlaceholderText("Image URL #1")).toBeInTheDocument();
  });
});
