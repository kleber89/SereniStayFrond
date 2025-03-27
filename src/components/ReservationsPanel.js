import React, { useState, useEffect } from "react";

function ReservationsPanel() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Usuario no autenticado. Por favor, inicie sesión.");
        }

        const response = await fetch("http://127.0.0.1:4000/create_booking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las reservas");
        }

        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Mis Reservas</h2>
      {error && <p style={{ color: "#F5E4C3" }}>{error}</p>}
      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservations.length === 0 ? (
        <p>No tienes reservas registradas.</p>
      ) : (
        <ul>
          {reservations.map((reserva, index) => (
            <li key={index}>
              {reserva.date} - {reserva.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReservationsPanel;
