import { createBrowserRouter } from 'react-router-dom';
import Principal from '../pages/princpal';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../pages/AdminDashboard';
import Transferencias from '../pages/Transferencias';
import Historial from '../pages/Historial';
import Perfil from '../pages/Perfil';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Principal />
      </ProtectedRoute>
    ),
  },
  {
    path: '/transferencias',
    element: (
      <ProtectedRoute>
        <Transferencias />
      </ProtectedRoute>
    ),
  },
  {
    path: '/historial',
    element: (
      <ProtectedRoute>
        <Historial />
      </ProtectedRoute>
    ),
  },
  {
    path: '/perfil',
    element: (
      <ProtectedRoute>
        <Perfil />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
