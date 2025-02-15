import React, { useState } from 'react';

function Register() {
  // Definimos el estado para el nombre de usuario, la contraseña y el correo electrónico
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue
    // Aquí puedes agregar la lógica para registrar al usuario
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);
    console.log('Correo electrónico:', email);
    // Resetear los campos después de enviar
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
