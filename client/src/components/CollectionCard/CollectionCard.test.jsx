import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import CollectionCard from ".";

describe("Collection Card component", () => {
  beforeEach(() => {
    const pokemon = {
      id: 1,
      name: "bulbasaur",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      evolves_into: "ivysaur",
    };
    render(<CollectionCard collectionPokemon={pokemon} />);
  });

  it("Displays and image of a pokemon", () => {
    const elem = screen.getByAltText("bulbasaur");
    expect(elem.alt).toBe("bulbasaur");
    expect(elem.src).toContain(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    );
  });
  afterEach(() => {
    cleanup();
  });
});
