import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Page from "../update/[id]/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useParams: () => ({ id: "1" }),
}));

jest.mock("@/lib/auth", () => ({
  isAuthenticated: jest.fn(() => true),
}));

jest.mock("@/lib/api", () => ({
  api: {
    getProductDetail: jest.fn().mockResolvedValue({
      title: "Test Product",
      price: 5000,
      description: "A product used for testing",
      images: [],
    }),
    updateProduct: jest.fn().mockResolvedValue({}),
  },
}));

beforeAll(() => {
  window.alert = jest.fn();
});

describe("🧪 Update Product Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with fetched data", async () => {
    await act(async () => {
      render(<Page />);
    });
    const heading = await screen.findByRole("heading", {
      name: /Update Product/i,
    });
    expect(heading).toBeInTheDocument();

    expect(await screen.findByDisplayValue("Test Product")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("5000")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("A product used for testing")
    ).toBeInTheDocument();
  });

  it("updates form field values when typing", async () => {
    await act(async () => {
      render(<Page />);
    });

    await screen.findByRole("heading", { name: /Update Product/i });

    const titleInput = screen.getByPlaceholderText("Enter product title");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    expect(titleInput).toHaveValue("Updated Title");
  });

  it("shows error message if API update fails", async () => {
    const { api } = await import("@/lib/api");
    (api.updateProduct as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    await act(async () => {
      render(<Page />);
    });

    await screen.findByRole("heading", { name: /Update Product/i });

    const button = screen.getByRole("button", { name: /Update Product/i });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/Failed to update product/i)).toBeInTheDocument()
    );
  });

  it("adds new image input when clicking 'Add Image'", async () => {
    await act(async () => {
      render(<Page />);
    });

    await screen.findByRole("heading", { name: /Update Product/i });

    const addButton = screen.getByRole("button", { name: /Add Image/i });
    fireEvent.click(addButton);

    const imageInput = screen.getByPlaceholderText("Image URL #1");
    expect(imageInput).toBeInTheDocument();
  });
});
