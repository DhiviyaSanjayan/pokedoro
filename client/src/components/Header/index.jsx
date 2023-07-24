import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className="container">
        <NavLink to="/collections" className="collection-page">
          <img className="ultraball" src="ultraBall.png" alt="collections-page" />
        </NavLink>
        <NavLink to="/timer" className="timer-page">
        <img className="diveball" src="diveball.png" alt="timer-page" />
        </NavLink>
      </div>
    </>
  );
}
