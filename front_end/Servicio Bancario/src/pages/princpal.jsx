import React from 'react';
import Layout from '../components/Layout';

const Principal = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <header>
          <h1>Resumen de Cuenta</h1>
          <p>Bienvenido a tu banca en línea</p>
        </header>
        
        <div className="dashboard-grid">
          <section className="balance-section card">
            <h2>Saldo Disponible</h2>
            <div className="balance-amount">$0.00</div>
          </section>

          <section className="actions-section card">
            <h2>Acciones Rápidas</h2>
            <div className="button-group">
              <button className="btn-primary">Nueva Transferencia</button>
              <button className="btn-secondary">Ver Historial</button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Principal;
