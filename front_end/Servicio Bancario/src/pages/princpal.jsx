import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import accountService from '../services/accountService';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const misCuentas = await accountService.getMisCuentas();
        setCuentas(misCuentas);
      } catch (error) {
        console.error("Error al cargar cuentas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCuentas();
  }, []);

  // Calculamos el saldo total sumando todas las cuentas del usuario
  const saldoTotal = cuentas.reduce((acc, cuenta) => acc + Number(cuenta.saldo), 0);

  return (
    <Layout>
      <div className="dashboard-container">
        <header>
          <h1>Resumen de Cuenta</h1>
          <p>Bienvenido a tu banca en línea</p>
        </header>
        
        <div className="dashboard-grid">
          <section className="balance-section card">
            <h2>Saldo Disponible Total</h2>
            {loading ? (
              <p>Cargando saldos...</p>
            ) : (
              <div className="balance-amount">${saldoTotal.toFixed(2)}</div>
            )}
            {cuentas.length > 0 && (
              <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                Distribuido en {cuentas.length} cuenta(s)
              </div>
            )}
          </section>

          <section className="actions-section card">
            <h2>Acciones Rápidas</h2>
            <div className="button-group">
              <button className="btn-primary" onClick={() => navigate('/transferencias')}>Nueva Transferencia</button>
              <button className="btn-secondary" onClick={() => navigate('/historial')}>Ver Historial</button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Principal;
