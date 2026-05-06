import api from './api';

const transactionService = {
  getHistory: async (cuentaId) => {
    const response = await api.get(`/transacciones/historial/${cuentaId}`);
    return response.data;
  },

  createTransfer: async (transferData) => {
    // transferData debe incluir cuenta_origen_id, cuenta_destino_id, monto, descripcion
    const response = await api.post('/transacciones/transferir', transferData);
    return response.data;
  }
};

export default transactionService;
