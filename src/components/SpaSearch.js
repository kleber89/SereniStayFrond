import React, { useState } from 'react';
// Importar las imágenes desde assets
import spaSerenidad from '../assets/images/spa1.jpg';
import wellnessCenter from '../assets/images/spa2.jpg';
import oasisSpa from '../assets/images/spa3.jpg';
import urbanRetreat from '../assets/images/spa4.jpg';

// Datos de ejemplo actualizados con imágenes locales
const INITIAL_SPAS = [
  {
    id: 1,
    name: "Spa Serenidad",
    location: "Madrid Centro",
    rating: 4.5,
    price: "€80/hora",
    description: "Experimenta la máxima relajación en nuestro spa de lujo",
    imageUrl: spaSerenidad,
    services: ["Masajes", "Sauna", "Tratamientos faciales"]
  },
  {
    id: 2,
    name: "Wellness Center",
    location: "Barcelona",
    rating: 4.8,
    price: "€95/hora",
    description: "Centro holístico para tu bienestar completo",
    imageUrl: wellnessCenter,
    services: ["Hidroterapia", "Yoga", "Masajes"]
  },
  {
    id: 3,
    name: "Oasis Spa",
    location: "Valencia",
    rating: 4.6,
    price: "€75/hora",
    description: "Tu oasis de tranquilidad en la ciudad",
    imageUrl: oasisSpa,
    services: ["Aromaterapia", "Masajes", "Piscina"]
  },
  {
    id: 4,
    name: "Urban Retreat",
    location: "Sevilla",
    rating: 4.7,
    price: "€85/hora",
    description: "Escapa del estrés en nuestro refugio urbano",
    imageUrl: urbanRetreat,
    services: ["Masajes", "Tratamientos corporales", "Meditación"]
  }
];

function SpaSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [spas] = useState(INITIAL_SPAS);

  const filteredSpas = spas.filter(spa =>
    spa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spa.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
  };

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
                onError={handleImageError}
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
              <button className="book-button">Reservar ahora</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpaSearch; 