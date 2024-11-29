import React from 'react';

const EditTenantForm = ({ editedTenant, handleEditChange, saveEditedTenant, closeEditModal }) => {
  // Função para tratar a mudança no valor do aluguel (para formatar corretamente o valor)
  const handleRentValueChange = (e) => {
    // Substitui a vírgula por ponto para garantir que o valor seja formatado corretamente
    const value = e.target.value.replace(',', '.');
    
    // Atualiza o valor do aluguel no estado do componente
    handleEditChange(e, value);
  };

  return (
    <div className="form-container">
      <h2>Editar Inquilino</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Impede o comportamento padrão de recarregar a página
          saveEditedTenant(); // Chama a função que já foi implementada para salvar as alterações
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedTenant.name}
            onChange={handleEditChange} // Função que lida com as mudanças nos inputs
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={editedTenant.cpf}
            onChange={handleEditChange} // Função que lida com as mudanças nos inputs
            required
            disabled // O campo CPF é desabilitado porque não podemos editar
          />
        </div>
        <div className="form-group">
          <label htmlFor="kitnetSize">Tamanho do Kitnet:</label>
          <select
            id="kitnetSize"
            name="kitnetSize"
            value={editedTenant.kitnetSize}
            onChange={handleEditChange} // Função que lida com as mudanças nos inputs
            required
          >
            <option value="pequeno">Pequeno</option>
            <option value="médio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rentValue">Valor do Aluguel:</label>
          <input
            type="text" // Usando "text" para permitir vírgulas
            id="rentValue"
            name="rentValue"
            value={editedTenant.rentValue}
            onChange={handleRentValueChange} // Usando a função para lidar com a vírgula
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Salvar</button>
          <button type="button" onClick={closeEditModal}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditTenantForm;
