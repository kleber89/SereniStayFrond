import React, { useState } from "react";

function BookingForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Reserva realizada para el ${date} a las ${time}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Fecha:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Hora:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Reservar</button>
    </form>
  );
}

export default BookingForm;
