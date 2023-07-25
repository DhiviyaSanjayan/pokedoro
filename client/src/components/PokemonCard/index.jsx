import React from 'react';
import "./index.css"
export default function PokemonCard ({pokemon}) {
    
    return (
        <div className="pokemon-card">
            <div className='image'>
                <img src={pokemon.sprite}></img>
            </div>
            <div>
                <h2 className='name'>{pokemon.name}</h2>

            </div>
        </div>
    )
};
