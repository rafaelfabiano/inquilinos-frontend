import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook para navegação
import NewTenantForm from './CreateTenantForm';
import ViewTenantTable from './ViewTenantTable';
import TenantInfos from './TenantInfos';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Cookies from 'js-cookie'; // Para ler o cookie
import './styles/Dashboard.css';

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('viewTenantTable'); // Estado para controlar a tela selecionada
  const navigate = useNavigate(); // Hook de navegação

  // Verificar se o usuário está logado ao carregar o componente
  useEffect(() => {
    const token = Cookies.get('token'); // Verifica o token nos cookies

    if (!token) {
      // Se não houver token, redireciona para a página de login
      navigate('/');  // Redireciona para o login
    }
  }, [navigate]); // Reexecuta o useEffect quando o componente for montado

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
    </div>
  );
}

export default Dashboard;
