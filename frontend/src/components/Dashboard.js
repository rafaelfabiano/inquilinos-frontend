import React, { useState } from 'react';
import NewTenantForm from './CreateTenantForm';
import ViewTenantTable from './ViewTenantTable';
import TenantInfos from './TenantInfos';
import Sidebar from './Sidebar';
import Header from './Header';  
import Footer from './Footer';
import './styles/Dashboard.css'; 

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('viewTenantTable'); // Estado para controlar a tela selecionada

  // Função para exibir o componente baseado na opção selecionada
  const renderContent = () => {
    switch (selectedOption) {
      case 'viewTenantTable':
        return <ViewTenantTable />;
      case 'newTenant':
        return <NewTenantForm />;
      case 'tenantInfos':
        return <TenantInfos />;
      default:
        return <ViewTenantTable />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Sidebar setSelectedOption={setSelectedOption} /> {/* Barra lateral com função para alterar a opção */}
        <div className="content-area">
          {renderContent()} {/* Exibe o conteúdo baseado na opção */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
