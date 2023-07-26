import "./index.css";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import { SearchWidget, Header, Carousel } from '../../components';

export default function HomePage() {
  const navigate = useNavigate();

  // Function to check authentication
  function checkAuth() {
    const authToken = localStorage.getItem('authToken'); // Change 'authToken' to the key of your authentication information in localStorage
    if (!authToken) {
      navigate("/login");
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="homepage">
      {/* ... Your existing JSX ... */}
    </div>
  );
}
