import "./index.css"
import React from 'react';
import { SearchWidget, Header, Carousel } from '../../components';


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
    <Carousel></Carousel>
    <Header></Header>
    
    <SearchWidget ></SearchWidget>
    
    
    <footer className="footerHome">
      Presented By: i-cant-centre-a-dhiv
      <br></br>
      <br></br>
      Copyright
      <br></br>
      <br></br>
      © Grininja Games
    </footer>
    
  </div>
)}

