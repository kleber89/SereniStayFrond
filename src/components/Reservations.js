import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirigir a login si no está autenticado
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:4000/create_booking', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener las reservas');
        }
        const data = await response.json();
        setReservas(data.reservations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, [navigate]);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Mis Reservas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Cargando reservas...</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Spa</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.length > 0 ? (
              reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.spa_nombre}</td>
                  <td>{reserva.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No tienes reservas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MisReservas;
