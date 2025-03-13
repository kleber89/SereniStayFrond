import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simular un pequeño delay para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Obtener usuarios del localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Buscar usuario
      const user = users.find(u => u.email === formData.email);

      if (user && user.password === formData.password) {
        // Guardar sesión del usuario
        localStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          email: user.email
        }));
        
        // Redirigir a la página de búsqueda de spas
        navigate('/spa-search');
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}

export default Login; 