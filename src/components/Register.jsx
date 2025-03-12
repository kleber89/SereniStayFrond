import React, { useState } from 'react';

function Register() {
  // Estados para almacenar los valores del formulario
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState(''); // Opcional
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Validación básica
    if (!firstName || !lastName || !email || !password) {
      setError('Todos los campos obligatorios deben ser completados.');
      return;
    }

    setLoading(true); // Activar estado de carga
    setError(''); // Limpiar errores previos

    try {
      // Simulación de registro con una API ficticia
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, secondName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      console.log('Usuario registrado:', data);
      alert('Registro exitoso'); // Puedes redirigir al usuario después de esto

      // Limpiar campos después del registro exitoso
      setFirstName('');
      setSecondName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Registrarse</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Primer Nombre:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div>
          <label>Segundo Nombre (Opcional):</label>
          <input
            type="text"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div>
          <label>Apellidos:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div>
          <label>Correo electrónico:</label>
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

        <button 
          type="submit" 
          style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }} 
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}

export default Register;
