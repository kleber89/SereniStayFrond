import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Inicio</Link>
        </li>
        <li className={location.pathname === "/search" ? "active" : ""}>
          <Link to="/search">Buscar Spas</Link>
        </li>
        <li className={location.pathname === "/bookings" ? "active" : ""}>
          <Link to="/bookings">Mis Reservas</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </li>
        ) : (
          <li className={location.pathname === "/login" ? "active" : ""}>
            <Link to="/login">Ingresar</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
