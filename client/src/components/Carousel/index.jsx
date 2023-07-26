import React, { useState, useEffect } from "react";
import "./index.css";


export default function Carousel() {
  return (
    <div className="pikachu">
      <div className="pikachu-container">
        <img className="pikachuIMG"src="src/components/Carousel/pikachu.gif" />
      </div>
      <div className="butter-container">
      <img className="butterIMG"src="/src/components/Carousel/butterfree.gif" />

      </div>
    </div>
  )
}
