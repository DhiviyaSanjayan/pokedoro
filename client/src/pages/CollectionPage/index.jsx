import { CollectionCard, Header } from "../../components";
import { useState, useEffect } from "react";
export default function CollectionPage() {
  const [collectionPokemon, setCollectionPokemon] = useState();
  const [userID, setUserID] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  function fetchUserID() {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = token.users_id;
    setUserID(id);
  }

  async function fetchPokemon() {
    try {
      const response = await fetch("http://localhost:3000/pokemon");
      const fullData = await response.json();
      const data = fullData.filter((pokemon) => pokemon.users_id === userID);
      setCollectionPokemon(data);
      setIsLoaded(true);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchPokemon();
    fetchUserID();
  }, [isLoaded]);

  return (
    <>
      <Header />
      <div className="collection-page">
        {isLoaded && collectionPokemon ? (
          <div className="collection-grid">
            {collectionPokemon.map((pokemon, i) => (
              <CollectionCard
                collectionPokemon={pokemon}
                isLoaded={isLoaded}
                key={i}
              />
            ))}
          </div>
        ) : (
          "loading"
        )}
      </div>
    </>
  );
}
