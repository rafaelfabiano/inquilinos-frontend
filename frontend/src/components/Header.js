import React from 'react';
import './styles/Header.css'; // Vamos criar o arquivo CSS para o estilo

function Header() {
  return (
    <header className="header-container">
      <img src="https://beanalytic.com.br/wp-content/uploads/2023/07/logo-pn.png" alt="Logo" className="logo" />
      <h1 className="title">Sistema de Inquilinos</h1>
    </header>
  );
}

export default Header;
