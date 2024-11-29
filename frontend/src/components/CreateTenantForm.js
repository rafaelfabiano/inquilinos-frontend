import React, { useState } from 'react';
import axios from 'axios'; // Importando o Axios
import './styles/Form.css'; // Certifique-se de que o estilo está correto

const CreateTenantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    kitnetSize: '',
    isInadimplent: false,
    inadimplenceTime: '',
    rentValue: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'rentValue') {
      // Substitui a vírgula por ponto para o cálculo correto
      const formattedValue = value.replace(',', '.');
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetando mensagens de sucesso ou erro anteriores
    setSuccessMessage('');
    setErrorMessage('');

    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!formData.name || !formData.cpf || !formData.kitnetSize || !formData.rentValue) {
      setErrorMessage('Todos os campos obrigatórios devem ser preenchidos!');
      return;
    }

    try {
      // Enviando os dados do formulário para o backend usando o Axios
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tenants`, // URL da API de inquilinos
        formData
      );

      // Caso a requisição seja bem-sucedida
      setSuccessMessage('Inquilino criado com sucesso!');
      
      // Limpar o formulário após a criação
      setFormData({
        name: '',
        cpf: '',
        kitnetSize: '',
        isInadimplent: false,
        inadimplenceTime: '',
        rentValue: ''
      });
    } catch (err) {
      console.error('Erro ao criar inquilino:', err);

      // Exibindo mensagem de erro caso a requisição falhe
      setErrorMessage(err.response ? err.response.data.msg : 'Erro ao criar inquilino');
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Novo Inquilino</h2>

      {/* Formulário de criação de inquilino */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome do inquilino"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="Digite o CPF"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kitnetSize">Tamanho do Kitnet:</label>
          <select
            name="kitnetSize"
            value={formData.kitnetSize}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="pequeno">Pequeno</option>
            <option value="médio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="isInadimplent">Está inadimplente?</label>
          <input
            type="checkbox"
            name="isInadimplent"
            checked={formData.isInadimplent}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inadimplenceTime">Tempo de inadimplência (em meses):</label>
          <input
            type="number"
            id="inadimplenceTime"
            name="inadimplenceTime"
            value={formData.inadimplenceTime}
            onChange={handleChange}
            min="0"
            disabled={!formData.isInadimplent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rentValue">Valor do Aluguel:</label>
          <input
            type="text"  // Alterado para 'text' para permitir vírgula
            id="rentValue"
            name="rentValue"
            value={formData.rentValue}
            onChange={handleChange}
            placeholder="Digite o valor do aluguel"
            required
          />
        </div>

        {/* Exibindo mensagens de sucesso ou erro */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Botão de envio */}
        <button type="submit" className="btn-submit">Criar Inquilino</button>
      </form>
    </div>
  );
};

export default CreateTenantForm;
