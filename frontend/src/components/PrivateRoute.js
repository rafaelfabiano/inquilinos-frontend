import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  // Ler o token do cookie
  const token = Cookies.get('token');  // Obtém o token do cookie

  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/" />; // Redireciona para o login
  }

  // Caso contrário, renderiza o componente filho (Dashboard)
  return children;
};

export default PrivateRoute;
