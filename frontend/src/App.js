import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login'; // Importa o componente de login
import Dashboard from './components/Dashboard'; // Importa o componente de dashboard

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Cabeçalho visível em todas as rotas */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Página inicial com login */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard */}
        </Routes>
        <Footer /> {/* Rodapé visível em todas as rotas */}
      </div>
    </Router>
  );
}

export default App;
