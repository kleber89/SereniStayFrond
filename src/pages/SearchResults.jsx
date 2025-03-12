import { useState, useEffect } from "react";
import SpaCard from "../components/SpaCard";

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de resultados de búsqueda desde una API
    setTimeout(() => {
      setResults([
        { id: 1, name: "Zen Spa", location: "Laureles", price: "180,000 COP" },
        { id: 2, name: "Haven Spa", location: "El Poblado", price: "250,000 COP" },
        { id: 3, name: "Serenity Spa", location: "Bello", price: "220,000 COP" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="search-results-container">
      <h1 className="search-title">Resultados de Búsqueda</h1>

      {loading ? (
        <p className="loading-text">Cargando resultados...</p>
      ) : results.length > 0 ? (
        <div className="spa-list">
          {results.map((spa) => (
            <SpaCard key={spa.id} name={spa.name} location={spa.location} price={spa.price} />
          ))}
        </div>
      ) : (
        <p className="no-results-text">No se encontraron spas con esos criterios.</p>
      )}
    </div>
  );
}

export default SearchResults;

