import React, { useState } from 'react';
import "./index.css"

export default function PokemonForm({ handleSearch }) {
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    const newInput = e.target.value;
    setInputValue(newInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(inputValue);
    setInputValue("");
  }

  return (
    <>
    
    <div className="container h-100">
    <div className="d-flex justify-content-center h-100">
      <div className="searchbar">
        
        <input className="search_input" type="text" name="" value={inputValue} onChange={handleInput}inplaceholder="Search..." />
        <a onClick={handleSubmit} href="#" className="search_icon"><i className="fas fa-search"></i></a>
       
      </div>
    </div>
  </div>
  </>
  );
}
