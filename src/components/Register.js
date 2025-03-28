import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Cliente' // Cliente por defecto
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Validaciones locales
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    setLoading(true);
    const roleMapping = {
      Cliente: "Client",
      Anfitrión: "Owner",
    };
    try {
      // Llamada al backend
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          middle_name: formData.middleName || null,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: roleMapping[formData.role],
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Error al registrar el usuario";
        if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((err) => err.msg).join(", ");
        } else if (typeof errorData.detail === "string") {
          errorMessage = errorData.detail;
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      alert(data.message || 'Registro exitoso!');
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-container">
      <h1 className="register-title">SereniStay</h1>
      <h2 className="register-subtitle">Registration</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Middle Name (Optional)"
              value={formData.middleName}
              onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group role-selector">
          <label className="role-label">Role:</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="role-select"
          >
            <option value="Client">Client</option>
            <option value="Host">Owner</option>
          </select>
        </div>
        
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
export default Register;


