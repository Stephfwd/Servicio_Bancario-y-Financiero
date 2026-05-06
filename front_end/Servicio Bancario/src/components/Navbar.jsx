import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Banca En Línea</h2>
      </div>
      <div className="navbar-user">
        {user ? (
          <>
            <span>Hola, {user.nombre}</span>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
