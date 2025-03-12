function SpaCard({ name, location, price }) {
    return (
      <div className="spa-card">
        <h2>{name}</h2>
        <p>Ubicación: {location}</p>
        <p>Precio: {price}</p>
        <button>Reservar</button>
      </div>
    );
  }
  
  export default SpaCard;
  