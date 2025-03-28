import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/web-app-manifest-192x192.png" alt="Logo SereniStay" className="logo-circular"/>
        <Link to="/">SereniStay</Link>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/reservations">My Reservations</Link>
            <button onClick={handleLogout} className="logout-button">log out</button>
          </>
        ) : (
        <div className="dropdown-container">
          {/* Botón del menú hamburguesa */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Menú de navegación"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <ul className="dropdown-menu">
              <li class="list">
                <Link 
                  to="/login" 
                  onClick={() => setMenuOpen(false)}
                  className="menu-item"
                >
                  Log In
                </Link>
              </li>
              <li class="list">
                <Link 
                  to="/register" 
                  onClick={() => setMenuOpen(false)}
                  className="menu-item"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;