import React from 'react';

const EditTenantForm = ({ editedTenant, handleEditChange, saveEditedTenant, closeEditModal }) => {
  const handleRentValueChange = (e) => {
    // Substitui a vírgula por ponto
    const value = e.target.value.replace(',', '.');
    
    // Atualiza o valor do aluguel
    handleEditChange(e, value);
  };

  return (
    <div className="form-container">
      <h2>Editar Inquilino</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveEditedTenant(); // Chama a função para salvar as alterações
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedTenant.name}
            onChange={handleEditChange}
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
            onChange={handleEditChange}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="kitnetSize">Tamanho do Kitnet:</label>
          <select
            id="kitnetSize"
            name="kitnetSize"
            value={editedTenant.kitnetSize}
            onChange={handleEditChange}
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
