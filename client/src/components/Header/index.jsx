import React from 'react';
import { NavLink } from 'react-router-dom';
import "./index.css"
import 'animate.css'


export default function Header() {
  return (
    <>
    <img className="headerBackground" src="/src/components/Header/homebackground2.png"></img>
    <h1 className="animate__animated animate__rubberBand">Pokedoro</h1>
    <div className='header'>
      <div className="navContainer">
        <nav>
        <NavLink to="/" className="collectionpage">
        
          <img className="navImageleft"src="./src/components/Header/ultraBall.png"/>
          <span className='spanL'>Home</span>
        </NavLink>
        <NavLink to="/collection" className="timerpage">
            
            <img className="navImageright" src="./src/components/Header/diveball.png"/>
            <span className='spanR'>Collection</span>
        </NavLink>
        </nav>
      </div>
    </div>
    </>
  );
}
