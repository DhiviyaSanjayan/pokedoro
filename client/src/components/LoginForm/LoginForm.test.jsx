import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCredentials } from "../../contexts";
import { CredentialsProvider } from "../../contexts";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import LoginForm from ".";
import RegisterForm from "../RegisterForm";

describe("Login form component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CredentialsProvider>
          <LoginForm />
        </CredentialsProvider>
      </BrowserRouter>
    );
  });

  it("Displays a heading with text", () => {
    const elem = screen.getByRole("heading");
    expect(elem.textContent).toBe("Sign In");
  });
  it("Displays a username input", () => {
    const elem = screen.getAllByPlaceholderText("Username");
    expect(elem[0].getAttribute("name")).toBe("username");
  });
  it("Displays a password input", () => {
    const elem = screen.getAllByPlaceholderText("Password");
    expect(elem[0].getAttribute("name")).toBe("password");
  });
  it("username input should accept text", () => {
    const elem = screen.getAllByPlaceholderText("Username");
    expect(elem[0].value).toBe("");
    fireEvent.change(elem[0], { target: { value: "testing" } });
    expect(elem[0].value).toBe("testing");
  });
  it("password input should accept text", () => {
    const elem = screen.getAllByPlaceholderText("Password");
    expect(elem[0].value).toBe("");
    fireEvent.change(elem[0], { target: { value: "testing" } });
    expect(elem[0].value).toBe("testing");
  });

  it("should redirect to register when link is clicked", async () => {
    const elem = screen.getByText("Don't have an account? Register.");
    expect(elem.href).toBe("http://localhost:3000/register");
    expect(screen.getByRole("heading").textContent).toBe("Sign In");
    render(
      <BrowserRouter>
        <CredentialsProvider>
          <RegisterForm />
          <LoginForm />
        </CredentialsProvider>
      </BrowserRouter>
    );
    await userEvent.click(elem);
    expect(screen.getAllByRole("heading")[1].textContent).toBe("Register");
  });
  afterEach(() => {
    cleanup();
  });
});
