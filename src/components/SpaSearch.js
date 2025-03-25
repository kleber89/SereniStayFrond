import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo
const INITIAL_SPAS = [
  {
    id: 1,
    name: "Spa Serenidad",
    location: "Medellin (Colombia)",
    rating: 4.5,
    price: "COP 80.000/hora",
    description: "Experimenta la máxima relajación en nuestro spa de lujo",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Masajes", "Sauna", "Tratamientos faciales"]
  },
  {
    id: 2,
    name: "Wellness Center",
    location: "Bogota (Colombia)",
    rating: 4.8,
    price: "COP 95.000/hora",
    description: "Centro holístico para tu bienestar completo",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    services: ["Hidroterapia", "Yoga", "Masajes"]
  },
  {
    id: 3,
    name: "Spa de la Montaña",
    location: "Cartagena (Colombia)",
    rating: 4.2,
    price: "COP 120.000/hora",
    description: "Relájate en nuestro spa con vista a la montaña",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Masajes", "Piscina climatizada", "Tratamientos corporales"]
  },
  {
    id: 4,
    name: "Beauty Spa",
    location: "Monteria (Colombia)",
    rating: 4.2,
    price: "COP 70.000/hora",
    description: "Tu lugar de belleza y bienestar",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Manicura", "Pedicura", "Tratamientos faciales"]
  },
  {
    id: 5,
    name: "Spa Zen",
    location: "Cali (Colombia)",
    rating: 4.6,
    price: "COP 85.000/hora",
    description: "Un oasis de tranquilidad en el corazón de la ciudad",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    services: ["Masajes", "Yoga", "Sauna"]
  },
  {
    id: 6,
    name: "Spa Naturaleza",
    location: "Cartagena (Colombia)",
    rating: 4.9,
    price: "COP 105.000/hora",
    description: "Relájate en armonía con la naturaleza",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Masajes", "Piscina climatizada", "Tratamientos faciales"]
  },
];

function SpaSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [spas] = useState(INITIAL_SPAS);
  const isLoggedIn = false; // Simula el estado de autenticación
  const navigate = useNavigate(); // Para redirigir al usuario

  const handleReserve = (spaName) => {
    if (isLoggedIn) {
      alert(`Has reservado una cita en ${spaName}!`);
    } else {
      navigate('/login'); // Redirige al login si no está logueado
    }
  };

  const filteredSpas = spas.filter(spa =>
    spa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spa.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="spa-search">
      <div className="search-header">
        <h2>Encuentra tu Spa Ideal</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="spa-grid">
        {filteredSpas.map(spa => (
          <div key={spa.id} className="spa-card">
            <div className="spa-image">
              <img 
                src={spa.imageUrl} 
                alt={spa.name}
                loading="lazy"
              />
              <div className="spa-price">{spa.price}</div>
            </div>
            <div className="spa-info">
              <h3>{spa.name}</h3>
              <p className="location">📍 {spa.location}</p>
              <p className="rating">⭐ {spa.rating}</p>
              <p className="description">{spa.description}</p>
              <div className="services">
                {spa.services.map((service, index) => (
                  <span key={index} className="service-tag">{service}</span>
                ))}
              </div>
              <button 
                className="book-button"
                onClick={() => handleReserve(spa.name)}
              >
                {isLoggedIn ? "Reservar ahora" : "Reservar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpaSearch;
