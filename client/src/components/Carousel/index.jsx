import React, { useState, useEffect } from 'react';

export default function PokemonCarousel() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // Fetch the data from the JSON endpoint
    fetch("../../pokemon.json")
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <img src={pokemon.sprite} alt={pokemon.name} />
    </div>
  );
}
