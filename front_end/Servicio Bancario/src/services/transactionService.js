import api from './api';

const transactionService = {
  getHistory: async () => {
    const response = await api.get('/transactions/history');
    return response.data;
  },

  createTransfer: async (transferData) => {
    const response = await api.post('/transactions/transfer', transferData);
    return response.data;
  }
};

export default transactionService;
