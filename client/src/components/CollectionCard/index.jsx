export default function CollectionCard({ collectionPokemon, isLoaded }) {
  return (
    <div className="collection-card">
      {collectionPokemon.sprite && isLoaded ? (
        <img
          src={collectionPokemon.sprite}
          className="collection-image"
          alt={collectionPokemon.name}
        />
      ) : (
        "loading"
      )}
      <h1 className="collection-card-title">{collectionPokemon.name}</h1>
    </div>
  );
}
