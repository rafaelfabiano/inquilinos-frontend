import React, { useState } from 'react';
import axios from 'axios';
import './styles/Form.css';

function CreateUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Função para enviar os dados ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      // Use a variável de ambiente para definir a URL base
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/createUser`,
        { name, email, password }
      );
      setSuccessMessage('Usuário criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Erro ao criar usuário:', err); // Exibir erro completo
      setErrorMessage(err.response ? err.response.data.msg : 'Erro ao criar inquilino');
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>
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
        <button type="submit" className="btn-submit">Criar Usuário</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default CreateUserForm;
