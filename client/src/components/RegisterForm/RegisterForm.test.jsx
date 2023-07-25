import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCredentials } from "../../contexts";
import { CredentialsProvider } from "../../contexts";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import RegisterForm from ".";
import LoginForm from "../LoginForm";

describe("Register form component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CredentialsProvider>
          <RegisterForm />
        </CredentialsProvider>
      </BrowserRouter>
    );
  });

  it("Displays a heading with text", () => {
    const elem = screen.getByRole("heading");
    expect(elem.textContent).toBe("Register");
  });
  it("Displays a username input", () => {
    const elem = screen.getByPlaceholderText("Username");
    expect(elem.getAttribute("name")).toBe("username");
  });
  it("Displays a password input", () => {
    const elem = screen.getByPlaceholderText("Password");
    expect(elem.getAttribute("name")).toBe("password");
  });
  it("username input should accept text", () => {
    const elem = screen.getByPlaceholderText("Username");
    expect(elem.value).toBe("");
    fireEvent.change(elem, { target: { value: "testing" } });
    expect(elem.value).toBe("testing");
  });
  it("password input should accept text", () => {
    const elem = screen.getByPlaceholderText("Password");
    expect(elem.value).toBe("");
    fireEvent.change(elem, { target: { value: "testing" } });
    expect(elem.value).toBe("testing");
  });
  it("should redirect to login when link is clicked", async () => {
    const elem = screen.getByText("Already have an account? Log in.");
    expect(elem.href).toBe("http://localhost:3000/login");
    expect(screen.getByRole("heading").textContent).toBe("Register");
    render(
      <BrowserRouter>
        <CredentialsProvider>
          <LoginForm />
          <RegisterForm />
        </CredentialsProvider>
      </BrowserRouter>
    );
    await userEvent.click(elem);
    expect(screen.getAllByRole("heading")[1].textContent).toBe("Sign In");
  });

  afterEach(() => {
    cleanup();
  });
});
