import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/transferencias" className={({ isActive }) => isActive ? 'active' : ''}>
            Transferencias
          </NavLink>
        </li>
        <li>
          <NavLink to="/historial" className={({ isActive }) => isActive ? 'active' : ''}>
            Historial
          </NavLink>
        </li>
        <li>
          <NavLink to="/perfil" className={({ isActive }) => isActive ? 'active' : ''}>
            Mi Perfil
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
