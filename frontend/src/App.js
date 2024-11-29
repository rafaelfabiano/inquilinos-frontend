import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importando os componentes do React Router
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login'; // Importa o componente de login
import Dashboard from './components/Dashboard'; // Importa o componente de dashboard
import PrivateRoute from './components/PrivateRoute'; // Importa o componente PrivateRoute

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Cabeçalho visível em todas as rotas */}

        <Routes>
          {/* Definindo a rota de login */}
          <Route path="/" element={<Login />} />

          {/* Definindo a rota do Dashboard, protegida pela PrivateRoute */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
