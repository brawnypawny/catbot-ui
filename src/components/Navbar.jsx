import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };



  return (
    <div className="navbar">
      <nav className="navbar-content">

        <div className="navbar-logo">
          <NavLink to="/" className="logo-link">
            😺 <span className="cat-text">Cat</span><span className="bot-text">Bot</span> 🤖
          </NavLink>
        </div>

        <div className="navbar-links">
          <NavLink to="/" className="navbar-link">Home</NavLink>
          <NavLink to="/create" className="navbar-link">Add a Cat</NavLink>
          <NavLink to="/cat-database" className="navbar-link">Cat Database</NavLink>

          {isLoggedIn ? (
            <button className="navbar-link logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="navbar-link">Login</NavLink>
          )}
        </div>

      </nav>
    </div>
  );
}
