import api from './api';

const accountService = {
  getMisCuentas: async () => {
    const response = await api.get('/cuentas');
    return response.data;
  },
  
  getCuentaDetalle: async (id) => {
    const response = await api.get(`/cuentas/${id}`);
    return response.data;
  }
};

export default accountService;
