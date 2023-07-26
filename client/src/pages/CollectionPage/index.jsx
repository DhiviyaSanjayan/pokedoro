import { CollectionCard, Header } from "../../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CollectionPage() {
  const [collectionPokemon, setCollectionPokemon] = useState();
  const [userID, setUserID] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  function checkAuth() {
    localStorage.length === 0 ? navigate("/login") : null;
  }

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
    checkAuth();
  }, []);

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
