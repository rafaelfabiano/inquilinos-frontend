import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTenantForm from './EditTenantForm'; // Importando o componente de edição
import './styles/Table.css';

const ViewTenantTable = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    kitnetSize: '',
    isInadimplent: ''
  });
  const [editingTenant, setEditingTenant] = useState(null);
  const [editedTenant, setEditedTenant] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTenants = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tenants`);
      setTenants(response.data);
      setFilteredTenants(response.data);
    } catch (error) {
      console.error('Erro ao buscar os inquilinos:', error);
    }
  };

  const applyFilters = () => {
    let filteredData = tenants;

    if (filters.name) {
      filteredData = filteredData.filter((tenant) =>
        tenant.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.kitnetSize) {
      filteredData = filteredData.filter((tenant) => tenant.kitnetSize === filters.kitnetSize);
    }

    if (filters.isInadimplent !== '') {
      const isInadimplent = filters.isInadimplent === 'true';
      filteredData = filteredData.filter((tenant) => tenant.isInadimplent === isInadimplent);
    }

    setFilteredTenants(filteredData);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({ name: '', kitnetSize: '', isInadimplent: '' });
  };

  const openEditModal = (tenant) => {
    setEditingTenant(tenant);
    setEditedTenant({ ...tenant });
    setIsModalOpen(true);
  };

  const saveEditedTenant = async () => {
    try {
      if (!editedTenant.name || !editedTenant.cpf || !editedTenant.kitnetSize || !editedTenant.rentValue) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/tenants`, editedTenant);

      const updatedTenant = response.data;
      const updatedTenants = tenants.map((tenant) =>
        tenant.cpf === updatedTenant.cpf ? updatedTenant : tenant
      );
      setTenants(updatedTenants);
      setFilteredTenants(updatedTenants);

      alert('Inquilino atualizado com sucesso!');
      closeEditModal(); // Fecha o modal de edição
    } catch (error) {
      console.error('Erro ao atualizar os dados do inquilino:', error);
      alert("Erro ao salvar as informações.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTenant({ ...editedTenant, [name]: value });
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingTenant(null); // Limpa os dados de edição
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tenants]);

  return (
    <div className="table-container">
      <h2>Visualizar Inquilinos</h2>

      {!isModalOpen && (
        <div className="filters">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Filtrar por nome"
          />
          <select name="kitnetSize" value={filters.kitnetSize} onChange={handleFilterChange}>
            <option value="">Filtrar por tamanho</option>
            <option value="pequeno">Pequeno</option>
            <option value="médio">Médio</option>
            <option value="grande">Grande</option>
          </select>
          <select name="isInadimplent" value={filters.isInadimplent} onChange={handleFilterChange}>
            <option value="">Filtrar por inadimplência</option>
            <option value="true">Inadimplente</option>
            <option value="false">Adimplente</option>
          </select>
          <button className="clear-filters-btn" onClick={clearFilters}>Limpar Filtros</button>
        </div>
      )}

      {!isModalOpen && (
        <table className="tenant-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Tamanho do Kitnet</th>
              <th>Status de Inadimplência</th>
              <th>Valor do Aluguel</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant.cpf}>
                <td>{tenant.name}</td>
                <td>{tenant.cpf}</td>
                <td>{tenant.kitnetSize}</td>
                <td>{tenant.isInadimplent ? 'Inadimplente' : 'Adimplente'}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(tenant.rentValue)}
                </td>
                <td>
                  <button onClick={() => openEditModal(tenant)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <EditTenantForm
          editedTenant={editedTenant}
          handleEditChange={handleEditChange}
          saveEditedTenant={saveEditedTenant}
          closeEditModal={closeEditModal}
        />
      )}
    </div>
  );
};

export default ViewTenantTable;
