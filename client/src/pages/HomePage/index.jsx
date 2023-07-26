import "./index.css"
import React from 'react';
import { SearchWidget, Header } from '../../components';


export default function HomePage() {
  return (
  <div className="homepage">
    
    <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    <Header></Header>
    <SearchWidget ></SearchWidget>
    
  </div>
)}

