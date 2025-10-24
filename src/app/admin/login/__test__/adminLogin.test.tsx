import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../page";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setCookie, isAuthenticated } from "@/lib/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  api: { login: jest.fn() },
}));

jest.mock("@/lib/auth", () => ({
  setCookie: jest.fn(),
  isAuthenticated: jest.fn(),
}));

describe("Login Page", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (isAuthenticated as jest.Mock).mockReturnValue(false);
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    render(<Page />);
    expect(screen.getByText("Welcome Admin")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("redirects to dashboard after successful login", async () => {
    (api.login as jest.Mock).mockResolvedValue({ token: "mockToken" });

    render(<Page />);
    const button = screen.getByRole("button", { name: /login/i });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("./dashboard");
    });
  });

  it("shows error message on failed login", async () => {
    (api.login as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials")
    );

    render(<Page />);
    const button = screen.getByRole("button", { name: /login/i });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Login failed. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
