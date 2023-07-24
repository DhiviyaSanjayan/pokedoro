import React, { useState, useEffect } from 'react';
import { PokemonForm, PokemonList } from '../';

export default function SearchWidget() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPokemonList, setShowPokemonList] = useState(false);

  useEffect(() => {
    async function searchAPI() {
      try {
        const response = await fetch('../../pokemon.json');
        const rawData = await response.json();
        
        
        const filteredData = rawData.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchString.toLowerCase())
        );
        
        setPokemonData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    searchAPI();
  }, [searchString]);

  function handleSearch(userInput) {
    setSearchString(userInput);
    setFormSubmitted(true);
  }

  return (
    <>
      <PokemonForm handleSearch={handleSearch} lastSearch={searchString} />
      {formSubmitted && <PokemonList pokemonData={pokemonData} />}
    </>
  );
}
