import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // El token ya no se maneja aquí, lo hace el navegador vía cookies
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirección forzada al cerrar sesión
    }
  },

  verifySession: async () => {
    try {
      const response = await api.get('/auth/verify');
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('user');
      return null;
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
