import React from 'react';
import './styles/Form.css';

const EditTenantForm = ({ editedTenant, handleEditChange, saveEditedTenant, closeEditModal }) => {
  return (
    <div className="form-container"> {/* Classe de container para aplicar os estilos */}
      <h2>Editar Inquilino</h2> {/* Usando o título com a classe de estilo */}

      <form>
        <div className="form-group"> {/* Grupo de formulário */}
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={editedTenant.name}
            onChange={handleEditChange}
          />
        </div>

        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={editedTenant.cpf}
            onChange={handleEditChange}
          />
        </div>

        <div className="form-group">
          <label>Tamanho do Kitnet:</label>
          <select
            name="kitnetSize"
            value={editedTenant.kitnetSize}
            onChange={handleEditChange}
          >
            <option value="pequeno">Pequeno</option>
            <option value="médio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status de Inadimplência:</label>
          <select
            name="isInadimplent"
            value={editedTenant.isInadimplent}
            onChange={handleEditChange}
          >
            <option value={true}>Inadimplente</option>
            <option value={false}>Adimplente</option>
          </select>
        </div>

        <div className="form-group">
          <label>Valor do Aluguel:</label>
          <input
            type="number"
            name="rentValue"
            value={editedTenant.rentValue}
            onChange={handleEditChange}
          />
        </div>

        <div className="modal-buttons"> {/* Botões de ação com estilos */}
          <button type="button" className="btn-submit" onClick={saveEditedTenant}>
            Salvar
          </button>
          <button type="button" className="btn-secondary" onClick={closeEditModal}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTenantForm;
