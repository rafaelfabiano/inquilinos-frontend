import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Para fazer requisições à API
import CreateUserForm from './CreateUserForm';
import Cookies from 'js-cookie'; // Para manipular os cookies
import './styles/Form.css';

function Login() {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Alternar entre os formulários de login e criação de usuário
  const toggleCreateUserForm = () => {
    setShowCreateUserForm(!showCreateUserForm);
  };

  // Função para autenticar o usuário
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      // Chamada à API de autenticação
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      // Sucesso: Armazenando o token nos cookies
      Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });

      // Redirecionando para o Dashboard após o login
      navigate('/dashboard');
    } catch (err) {
      // Define a mensagem de erro baseada na resposta do backend
      setErrorMessage(
        err.response?.data?.msg || 'Erro ao realizar login. Tente novamente.'
      );
      console.error('Erro no login:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>{!showCreateUserForm ? 'Login' : 'Criar Usuário'}</h2>

      {/* Formulário de Login */}
      {!showCreateUserForm ? (
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Entrar</button>
          <button type="button" className="btn-secondary" onClick={toggleCreateUserForm}>
            Criar Usuário
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      ) : (
        // Formulário de criação de usuário
        <div>
          <CreateUserForm />
          <button type="button" className="btn-secondary" onClick={toggleCreateUserForm}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
