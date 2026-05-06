import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const validatedUser = await authService.verifySession();
      setUser(validatedUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div className="loading-screen">Verificando sesión...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/" replace />; // O una página de "No autorizado"
  }

  return children;
};

export default ProtectedRoute;
