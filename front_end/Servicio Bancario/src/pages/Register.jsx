import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [userData, setUserData] = useState({ 
    nombre: '', 
    apellido: '',
    email: '', 
    password: '',
    telefono: '',
    dui: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(userData);
      alert('¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al registrar. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card card register-card">
        <div className="card-header">
          <h2>Crea tu Cuenta</h2>
          <p>Únete a nuestra banca digital en pocos pasos</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. Carlos"
                value={userData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                placeholder="Ej. García"
                value={userData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
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
              placeholder="Mínimo 6 caracteres"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono (Opcional)</label>
              <input
                type="text"
                name="telefono"
                placeholder="7777-7777"
                value={userData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>DUI (Opcional)</label>
              <input
                type="text"
                name="dui"
                placeholder="00000000-0"
                value={userData.dui}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block" disabled={loading}>
            {loading ? 'Procesando...' : 'Registrarme ahora'}
          </button>
        </form>

        <div className="card-footer">
          <p>¿Ya tienes una cuenta? <span onClick={() => navigate('/login')}>Inicia sesión aquí</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
