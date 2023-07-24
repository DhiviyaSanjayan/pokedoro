import React from 'react';
import {PokemonCard} from '../';

export default function PokemonList ({ pokemonData }) {
    function renderPokemons() {
        return pokemonData.map(s => <PokemonCard key={s.id} pokemon={s} />)
    }

    return <div className="pokemon-list">        
        { renderPokemons() }
    </div>
};
