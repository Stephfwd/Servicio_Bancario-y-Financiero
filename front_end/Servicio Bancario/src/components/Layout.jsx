import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content-wrapper">
        <Sidebar />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
