import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import TimerPage from ".";
import { BrowserRouter } from "react-router-dom";

describe("Timer component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerPage />
      </BrowserRouter>
    );
  });

  it("Displays a time", () => {
    const elem = screen.getByText("00:05");
    expect(elem).toBeInTheDocument();
    expect(elem.textContent).toBe("00:05");
  });

  it("Increments the display when the + button is clicked", async () => {
    const display = screen.getByText("00:05");
    const button = screen.getAllByText("+")[0];

    expect(display.textContent).toBe("00:05");
    await userEvent.click(button);
    expect(display.textContent).toBe("01:05");
  });
  it("Decreases the display when the - button is clicked", async () => {
    const display = screen.getByText("00:05");
    const plusbutton = screen.getAllByText("+")[0];
    const minusbutton = screen.getAllByText("-")[0];

    expect(display.textContent).toBe("00:05");
    await userEvent.click(plusbutton);
    expect(display.textContent).toBe("01:05");
    await userEvent.click(minusbutton);
    expect(display.textContent).toBe("00:05");
  });
  it("Starts the display when the start button is clicked", async () => {
    const display = screen.getByText("00:05");
    const button = screen.getByText("Start");

    expect(display.textContent).toBe("00:05");
    await userEvent.click(button);
    setTimeout(() => {
      expect(display.textContent).toBe("00:04");
    }, 2000);
  });

  it("Displays a pokemon", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "bulbasaur",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          evolves_into: "ivysaur",
        },
      ],
    }),
      render(
        <BrowserRouter>
          <TimerPage />
        </BrowserRouter>
      );

    const image = await screen.getAllByText("loading")[0];
    console.log(image);
    expect(image.innerHTML).toBe("loading");
  });

  afterEach(() => {
    cleanup();
  });
});
