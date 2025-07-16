
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar-content">

        <div className="navbar-logo">
          <NavLink to="/" className="logo-link">
            😺 <span className="cat-text">Cat</span><span className="bot-text">Bot</span> 🤖
          </NavLink>
        </div>

        <div className="navbar-links">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/create" className="navbar-link">
            Add a Cat
          </NavLink>
          <NavLink to="/cats" className="navbar-link">
            Cat Database
          </NavLink>
        </div>
        
      </nav>
    </div>
  );
}
