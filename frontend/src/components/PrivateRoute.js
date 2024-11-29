import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/" />; // Redireciona para o login
  }

  // Caso contrário, renderiza o componente filho (Dashboard)
  return children;
};

export default PrivateRoute;
