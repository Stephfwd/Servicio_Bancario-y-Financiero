import { createBrowserRouter } from 'react-router-dom';
import Principal from '../pages/princpal';
import Login from '../pages/Login';
import Register from '../pages/Register';
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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  // Más rutas protegidas se pueden añadir aquí
]);

export default router;
