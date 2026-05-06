import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import authService from '../services/authService';

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtenemos los datos del usuario logueado
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user) return <Layout><p>Cargando perfil...</p></Layout>;

  return (
    <Layout>
      <div className="perfil-container">
        <h1>Mi Perfil</h1>
        <p>Información personal y de cuenta.</p>

        <div className="card perfil-card">
          <div className="perfil-header">
            <div className="avatar">
              {user.nombre.charAt(0)}{user.apellido.charAt(0)}
            </div>
            <div>
              <h2>{user.nombre} {user.apellido}</h2>
              <span className={`badge badge-${user.rol}`}>{user.rol}</span>
            </div>
          </div>
          
          <div className="perfil-detalles">
            <div className="detalle-item">
              <strong>Email:</strong>
              <p>{user.email}</p>
            </div>
            <div className="detalle-item">
              <strong>ID de Usuario:</strong>
              <p>{user.id}</p>
            </div>
            <div className="detalle-item">
              <strong>Teléfono:</strong>
              <p>{user.telefono || 'No registrado'}</p>
            </div>
            <div className="detalle-item">
              <strong>DUI:</strong>
              <p>{user.dui || 'No registrado'}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Perfil;
