import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SpaCard from "../components/SpaCard";

function Home() {
  const [spas, setSpas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos de una API
    setTimeout(() => {
      setSpas([
        { id: 1, name: "Spa Relax", location: "Medellín", price: "150,000 COP" },
        { id: 2, name: "Aqua Wellness", location: "Envigado", price: "200,000 COP" },
        { id: 3, name: "Zen Harmony", location: "Bello", price: "180,000 COP" },
        { id: 4, name: "Nature Spa", location: "Sabaneta", price: "170,000 COP" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">
        Encuentra tu <span className="highlight">Spa Ideal</span>
      </h1>
      <p className="home-subtitle">Reserva experiencias de relajación en los mejores Spas.</p>

      <SearchBar />

      {loading ? (
        <p className="loading-text">Cargando spas...</p>
      ) : (
        <div className="spa-list">
          {spas.map((spa) => (
            <SpaCard key={spa.id} name={spa.name} location={spa.location} price={spa.price} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
