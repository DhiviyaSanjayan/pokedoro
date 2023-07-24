import React, { useState , useEffect} from 'react';

export default function PokemonForm({ handleSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [showPokemonList, setShowPokemonList] = useState(false);
  function handleInput(e) {
    const newInput = e.target.value;
    setInputValue(newInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(inputValue);
    setInputValue("");
  }
  useEffect(() => {
    if (showPokemonList) {
      
      setTimeout(() => {
        setShowPokemonList(true);
      }, 50);
    }
  }, [showPokemonList]);


  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          placeholder="Search something"
          value={inputValue}
          required
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
