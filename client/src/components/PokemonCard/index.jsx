import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

import "./index.css"

export default function PokemonCard({ pokemon }) {
  const [evolutionData, setEvolutionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchEvolutionData(pokemon);
  }, [pokemon]);

  async function fetchEvolutionData(pokemon) {
    let currentPokemon = { name: pokemon.name, sprite: pokemon.sprite, id: pokemon.id }; 
    const evolutions = [currentPokemon];

    while (pokemon.evolves_into) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.evolves_into}`);
      pokemon = {
        name: response.data.name,
        sprite: response.data.sprites.other['official-artwork'].front_default,
        evolves_into: response.data.evolves_into,
        id: response.data.id, 
      };
      evolutions.push(pokemon);
    }

    setEvolutionData(evolutions);
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-card">
      {evolutionData.map((evolutionPokemon) => (
        <div key={evolutionPokemon.name}>
          <div className='imageContainer'>
            <img className="image" src={evolutionPokemon.sprite} alt={evolutionPokemon.name} />
          </div>
          <div>
            <h2 className='name'>{evolutionPokemon.name}</h2>
          </div>
        </div>
      ))}

      {/* Render the Link component directly */} 
      <Link className='getme' to={`/timer/${pokemon.id}`}>Get Me!</Link>
    </div>
  );
}
