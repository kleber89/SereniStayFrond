import React, { useState } from "react";

function Bookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      services: ["Masaje", "Aromaterapia"],
      total_amount: 120.5,
      booking_date: "2025-02-20T15:00:00",
      status: "confirmed",
    },
    {
      id: 2,
      services: ["Facial", "Sauna"],
      total_amount: 90.0,
      booking_date: "2025-02-22T10:30:00",
      status: "pending",
    },
  ]);

  return (
    <div className="page">
      <h1>Mis Reservas</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
              <strong>Servicios:</strong> {booking.services.join(", ")} <br />
              <strong>Total:</strong> ${booking.total_amount.toFixed(2)} <br />
              <strong>Fecha:</strong> {new Date(booking.booking_date).toLocaleString()} <br />
              <strong>Estado:</strong> <span style={{ color: booking.status === "confirmed" ? "green" : booking.status === "pending" ? "orange" : "red" }}>{booking.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes reservas aún.</p>
      )}
    </div>
  );
}

export default Bookings;
