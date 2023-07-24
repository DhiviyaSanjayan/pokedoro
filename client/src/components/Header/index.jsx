import React from 'react';
import { NavLink } from 'react-router-dom';
import "./index.css"
export default function Header() {
  return (
    <>
      <div className="container">
        <nav>
        <NavLink to="/collections" className="collection-page">
          <h1>Collection Page</h1>
        </NavLink>
        <NavLink to="/timer" className="timer-page">
            <h1>Timer Page</h1>
        </NavLink>
        </nav>
      </div>
    </>
  );
}
