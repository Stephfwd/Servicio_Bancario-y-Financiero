import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import transactionService from '../services/transactionService';
import accountService from '../services/accountService';

const Historial = () => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState('');
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Cargar las cuentas del usuario al montar el componente
  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const misCuentas = await accountService.getMisCuentas();
        setCuentas(misCuentas);
        if (misCuentas.length > 0) {
          setCuentaSeleccionada(misCuentas[0].id);
        }
      } catch (err) {
        setError('Error al cargar tus cuentas');
      }
    };
    fetchCuentas();
  }, []);

  // 2. Cargar historial cuando cambie la cuenta seleccionada
  useEffect(() => {
    if (!cuentaSeleccionada) return;
    
    const fetchHistorial = async () => {
      setLoading(true);
      try {
        const hist = await transactionService.getHistory(cuentaSeleccionada);
        setTransacciones(hist);
      } catch (err) {
        setError('Error al cargar el historial de transacciones');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistorial();
  }, [cuentaSeleccionada]);

  const formatearFecha = (fechaString) => {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
  };

  return (
    <Layout>
      <div className="historial-container">
        <h1>Historial de Transacciones</h1>
        
        {error && <p className="error-message">{error}</p>}

        <div className="filtros-historial">
          <label>Selecciona una cuenta: </label>
          <select 
            value={cuentaSeleccionada} 
            onChange={(e) => setCuentaSeleccionada(e.target.value)}
            className="cuenta-selector"
          >
            {cuentas.map(cuenta => (
              <option key={cuenta.id} value={cuenta.id}>
                {cuenta.numero_cuenta} - Saldo: ${cuenta.saldo}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Cargando movimientos...</p>
        ) : (
          <div className="card">
            {transacciones.length === 0 ? (
              <p style={{ padding: '20px', textAlign: 'center' }}>No hay transacciones registradas para esta cuenta.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Referencia</th>
                  </tr>
                </thead>
                <tbody>
                  {transacciones.map(tx => {
                    const esIngreso = tx.cuenta_destino_id === Number(cuentaSeleccionada);
                    const colorMonto = esIngreso ? '#28a745' : '#dc3545';
                    const signo = esIngreso ? '+' : '-';
                    
                    return (
                      <tr key={tx.id}>
                        <td>{formatearFecha(tx.fecha)}</td>
                        <td>{tx.descripcion}</td>
                        <td><span className={`badge badge-${esIngreso ? 'ingreso' : 'egreso'}`}>{esIngreso ? 'Ingreso' : 'Egreso'}</span></td>
                        <td style={{ color: colorMonto, fontWeight: 'bold' }}>
                          {signo}${tx.monto}
                        </td>
                        <td style={{ fontSize: '0.8rem', color: '#666' }}>{tx.id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Historial;
