import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import transactionService from '../services/transactionService';
import accountService from '../services/accountService';

const Transferencias = () => {
  const [cuentas, setCuentas] = useState([]);
  const [formData, setFormData] = useState({
    cuenta_origen_id: '',
    cuenta_destino_id: '',
    monto: '',
    descripcion: ''
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const misCuentas = await accountService.getMisCuentas();
        setCuentas(misCuentas);
        if (misCuentas.length > 0) {
          setFormData(prev => ({ ...prev, cuenta_origen_id: misCuentas[0].id }));
        }
      } catch (error) {
        setMensaje({ texto: 'Error al cargar tus cuentas', tipo: 'error' });
      }
    };
    fetchCuentas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      const result = await transactionService.createTransfer(formData);
      setMensaje({ texto: 'Transferencia realizada con éxito', tipo: 'exito' });
      setFormData({ ...formData, monto: '', descripcion: '', cuenta_destino_id: '' });
      // Recargar cuentas para actualizar saldo
      const misCuentas = await accountService.getMisCuentas();
      setCuentas(misCuentas);
    } catch (error) {
      setMensaje({ texto: error.response?.data?.message || 'Error al realizar la transferencia', tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="transferencias-container">
        <h1>Realizar Transferencia</h1>
        <p>Envía dinero a otras cuentas de forma segura.</p>

        {mensaje.texto && (
          <div className={`mensaje ${mensaje.tipo === 'error' ? 'error-message' : 'success-message'}`}>
            {mensaje.texto}
          </div>
        )}

        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Cuenta de Origen</label>
              <select 
                name="cuenta_origen_id" 
                value={formData.cuenta_origen_id} 
                onChange={handleChange} 
                required
              >
                {cuentas.map(cuenta => (
                  <option key={cuenta.id} value={cuenta.id}>
                    {cuenta.numero_cuenta} - Saldo: ${cuenta.saldo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>ID Cuenta Destino</label>
              <input 
                type="number" 
                name="cuenta_destino_id" 
                value={formData.cuenta_destino_id} 
                onChange={handleChange} 
                placeholder="Ej. 2"
                required 
              />
            </div>

            <div className="form-group">
              <label>Monto a transferir ($)</label>
              <input 
                type="number" 
                name="monto" 
                step="0.01" 
                min="0.01" 
                value={formData.monto} 
                onChange={handleChange} 
                placeholder="0.00"
                required 
              />
            </div>

            <div className="form-group">
              <label>Descripción / Motivo</label>
              <input 
                type="text" 
                name="descripcion" 
                value={formData.descripcion} 
                onChange={handleChange} 
                placeholder="Ej. Pago de alquiler"
                required 
              />
            </div>

            <button type="submit" className="btn-primary btn-block" disabled={loading || cuentas.length === 0}>
              {loading ? 'Procesando...' : 'Transferir Fondos'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Transferencias;
