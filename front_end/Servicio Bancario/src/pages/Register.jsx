import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [userData, setUserData] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(userData);
      navigate('/login');
    } catch (err) {
      setError('Error al registrar usuario. Intente con otro correo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <h2>Registro</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia sesión</span></p>
      </div>
    </div>
  );
};

export default Register;
