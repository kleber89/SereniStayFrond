import React, { useState } from 'react';

function Login() {
  // Estados para almacenar los valores de usuario y contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar recargar la página

    // Validación básica
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Aquí iría la lógica de autenticación (ejemplo: llamar a una API)
    console.log('Iniciando sesión con:', email, password);
    
    // Limpiar el error en caso de éxito
    setError('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
