import "./index.css"
import React from 'react';
import { SearchWidget } from '../../components';


export default function HomePage() {
  return (
  <>
    <div className="container">
      <div className="collection-page">
        <img NavLink to="/collections" className="ultraball" src="ultraBall.png" alt="collections-page"/>
      </div>
      <div className="timer-page"></div>
    </div>
    <SearchWidget ></SearchWidget>
  </>
)}

