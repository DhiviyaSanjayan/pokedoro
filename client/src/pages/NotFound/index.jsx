import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Oops! You seem to be lost.</h1>
      <div className="p-and-img">
        <p>Here are some links to our site:</p>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"
          alt="psyduck"
          style={{ width: "10rem", padding: "0", margin: "0" }}
        />{" "}
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/login">Log In</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
