import React, { useState } from 'react';
import { FaUsers, FaUserPlus, FaInfoCircle } from 'react-icons/fa'; // Usando os ícones do react-icons
import './styles/Sidebar.css'; // Importando o CSS para estilização

function Sidebar({ setSelectedOption }) {
  const [hoveredOption, setHoveredOption] = useState(null); // Estado para saber qual ícone o mouse está sobre
  const [activeOption, setActiveOption] = useState(null); // Estado para saber qual item está ativo

  const handleClick = (option) => {
    setActiveOption(option); // Define o item como ativo
    setSelectedOption(option); // Passa a opção para o componente pai
  };

  return (
    <div className="sidebar">
      <div 
        className="sidebar-item" 
        onMouseEnter={() => setHoveredOption('viewTenantTable')} 
        onMouseLeave={() => setHoveredOption(null)}
      >
        <button 
          className={`sidebar-button ${activeOption === 'viewTenantTable' ? 'active' : ''}`} 
          onClick={() => handleClick('viewTenantTable')}
        >
          <FaUsers className="sidebar-icon" />
          {(hoveredOption === 'viewTenantTable' || activeOption === 'viewTenantTable') && (
            <span className="sidebar-text">Ver Inquilinos</span>
          )}
        </button>
      </div>
      <div 
        className="sidebar-item" 
        onMouseEnter={() => setHoveredOption('newTenant')} 
        onMouseLeave={() => setHoveredOption(null)}
      >
        <button 
          className={`sidebar-button ${activeOption === 'newTenant' ? 'active' : ''}`} 
          onClick={() => handleClick('newTenant')}
        >
          <FaUserPlus className="sidebar-icon" />
          {(hoveredOption === 'newTenant' || activeOption === 'newTenant') && (
            <span className="sidebar-text">Novo Inquilino</span>
          )}
        </button>
      </div>
      <div 
        className="sidebar-item" 
        onMouseEnter={() => setHoveredOption('tenantInfos')} 
        onMouseLeave={() => setHoveredOption(null)}
      >
        <button 
          className={`sidebar-button ${activeOption === 'tenantInfos' ? 'active' : ''}`} 
          onClick={() => handleClick('tenantInfos')}
        >
          <FaInfoCircle className="sidebar-icon" />
          {(hoveredOption === 'tenantInfos' || activeOption === 'tenantInfos') && (
            <span className="sidebar-text">Dashboard</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
