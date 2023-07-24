import "./index.css"
import React from 'react';
import { SearchWidget, Header } from '../../components';


export default function HomePage() {
  return (
  <div className="homepage">
    <Header></Header>
    <SearchWidget ></SearchWidget>
  </div>
)}

