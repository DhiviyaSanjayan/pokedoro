export default function CollectionCard({ collectionPokemon }) {
  return (
    <img
      src={collectionPokemon.sprite}
      className="collection-image"
      alt={collectionPokemon.name}
    />
  );
}
