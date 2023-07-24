import { CollectionCard } from "../../components";
import { useState, useEffect } from "react";
export default function CollectionPage() {
  const [collectionPokemon, setCollectionPokemon] = useState([]);
  async function fetchPokemon() {
    try {
      const response = await fetch("../../pokemon.json");
      const data = await response.json();
      setCollectionPokemon(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="collection-page">
      {collectionPokemon ? (
        <div className="collection-grid">
          {collectionPokemon.map((pokemon, i) => (
            <CollectionCard collectionPokemon={pokemon} key={i} />
          ))}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
