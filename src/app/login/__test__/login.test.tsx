/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Page from "../page";

// mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// mock auth
jest.mock("@/lib/auth", () => ({
  setCookie: jest.fn(),
  isAuthenticated: jest.fn(() => false),
}));

// mock api
jest.mock("@/lib/api", () => ({
  api: {
    login: jest.fn(() => Promise.resolve({ token: "dummy_token" })),
  },
}));

describe("Login Page", () => {
  test("renders username and password fields", () => {
    render(<Page />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("updates input fields when typing", () => {
    render(<Page />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(passwordInput, { target: { value: "newpass" } });

    expect(usernameInput).toHaveValue("newuser");
    expect(passwordInput).toHaveValue("newpass");
  });

  test("shows loading state when submitting", async () => {
    render(<Page />);
    const button = screen.getByRole("button", { name: /Login/i });

    fireEvent.click(button);
    expect(button).toHaveTextContent("Logging in...");

    await waitFor(() => expect(button).toHaveTextContent("Login"));
  });

  test("calls api.login and setCookie on successful login", async () => {
    const { api } = require("@/lib/api");
    const { setCookie } = require("@/lib/auth");

    render(<Page />);
    const button = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith("emilys", "emilyspass");
      expect(setCookie).toHaveBeenCalled();
    });
  });
});
