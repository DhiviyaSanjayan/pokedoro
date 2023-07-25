import React from 'react';
import { NavLink } from 'react-router-dom';
import "./index.css"
export default function Header() {
  return (
    <div className='header'>
      <div className="navContainer">
        <nav>
        <NavLink to="/collections" className="collectionpage">
        
          <img className="navImageleft"src="./src/components/Header/ultraBall.png"/>
          <span className='spanL'>Collection</span>
        </NavLink>
        <NavLink to="/timer" className="timerpage">
            
            <img className="navImageright" src="./src/components/Header/diveball.png"/>
            <span className='spanR'>Timer</span>
        </NavLink>
        </nav>
      </div>
    </div>
  );
}
