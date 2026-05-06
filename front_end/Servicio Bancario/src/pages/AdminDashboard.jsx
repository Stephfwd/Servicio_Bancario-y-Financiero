import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estado para el formulario (Crear/Editar)
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', email: '', password: '', telefono: '', dui: '', rol_id: 2, estado: 'activo'
  });

  const fetchData = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/roles')
      ]);
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
    } catch (err) {
      setError('Error al cargar datos de administración.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: '', // No cargamos la contraseña por seguridad
      telefono: user.telefono || '',
      dui: user.dui || '',
      rol_id: user.rol_id,
      estado: user.estado
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.put(`/admin/users/${editingUser.id}`, formData);
        alert('Usuario actualizado correctamente');
      } else {
        await api.post('/admin/users', formData);
        alert('Usuario creado correctamente');
      }
      setShowModal(false);
      setEditingUser(null);
      fetchData(); // Recargar lista
    } catch (err) {
      alert('Error al procesar la solicitud');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert('Error al eliminar usuario');
      }
    }
  };

  return (
    <Layout>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <button className="btn-primary" onClick={() => { setEditingUser(null); setFormData({ nombre: '', apellido: '', email: '', password: '', telefono: '', dui: '', rol_id: 2, estado: 'activo' }); setShowModal(true); }}>
            + Nuevo Usuario
          </button>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre} {user.apellido}</td>
                    <td>{user.email}</td>
                    <td><span className={`badge badge-${user.rol?.nombre}`}>{user.rol?.nombre}</span></td>
                    <td><span className={`status-${user.estado}`}>{user.estado}</span></td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(user)}>Editar</button>
                      <button className="btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Simulado */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content card">
              <h2>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Apellido</label>
                    <input name="apellido" value={formData.apellido} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                {!editingUser && (
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label>Rol</label>
                    <select name="rol_id" value={formData.rol_id} onChange={handleChange}>
                      {roles.map(rol => (
                        <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <select name="estado" value={formData.estado} onChange={handleChange}>
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button type="submit" className="btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
