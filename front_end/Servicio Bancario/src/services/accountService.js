import api from './api';

const accountService = {
  getAccountDetails: async () => {
    const response = await api.get('/accounts/me');
    return response.data;
  },
  
  getBalances: async () => {
    const response = await api.get('/accounts/balances');
    return response.data;
  }
};

export default accountService;
