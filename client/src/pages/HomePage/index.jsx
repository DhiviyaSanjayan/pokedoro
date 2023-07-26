import "./index.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchWidget, Header } from "../../components";

export default function HomePage() {
  const navigate = useNavigate();
  function checkAuth() {
    localStorage.length === 0 ? navigate("/login") : null;
  }
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="homepage">
      <div className="area">
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
      </div>
      <Header></Header>
      <SearchWidget></SearchWidget>
    </div>
  );
}
