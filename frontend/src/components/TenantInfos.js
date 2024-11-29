import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';  // Importando para redirecionamento
import './styles/TenantInfos.css'; // Importando os estilos

// Registrando os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const TenantInfos = () => {
  const [tenants, setTenants] = useState([]);
  const [inadimplentes, setInadimplentes] = useState([]);
  const [porcentagemInadimplentes, setPorcentagemInadimplentes] = useState(0);
  const [porcentagemNaoInadimplentes, setPorcentagemNaoInadimplentes] = useState(0);
  
  const navigate = useNavigate();  // Hook de navegação
  const token = localStorage.getItem('token'); // Obter o token JWT do localStorage

  // Verifica se o usuário está autenticado, se não redireciona para login
  useEffect(() => {
    if (!token) {
      navigate('/');  // Redireciona para a página de login
    }
  }, [token, navigate]);

  // Função para buscar os inquilinos
  const fetchTenants = async () => {
    if (!token) {
      return;  // Se não houver token, não faz a requisição
    }
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tenants`, {
        headers: {
          'Authorization': `Bearer ${token}` // Envia o token no cabeçalho da requisição
        }
      });
      setTenants(response.data); // Armazenando os inquilinos
    } catch (error) {
      console.error('Erro ao buscar os inquilinos:', error);
      alert('Erro ao buscar os dados dos inquilinos. Verifique sua autenticação.');
    }
  };

  // Função para calcular a porcentagem de inadimplentes
  const calculateInadimplentes = () => {
    const inadimplentesList = tenants.filter((tenant) => tenant.isInadimplent === true); // Certificando-se de que o filtro esteja correto
    setInadimplentes(inadimplentesList);

    const totalTenants = tenants.length;
    const inadimplentesCount = inadimplentesList.length;

    const inadimplentesPercentage = (inadimplentesCount / totalTenants) * 100;
    const naoInadimplentesPercentage = 100 - inadimplentesPercentage;

    setPorcentagemInadimplentes(inadimplentesPercentage.toFixed(2));
    setPorcentagemNaoInadimplentes(naoInadimplentesPercentage.toFixed(2));
  };

  useEffect(() => {
    fetchTenants();
  }, [token]);  // Faz a requisição sempre que o token mudar

  useEffect(() => {
    if (tenants.length > 0) {
      calculateInadimplentes();
    }
  }, [tenants]);

  // Dados para o gráfico de pizza
  const pieChartData = {
    labels: ['Inadimplentes', 'Não Inadimplentes'],
    datasets: [
      {
        data: [porcentagemInadimplentes, porcentagemNaoInadimplentes],
        backgroundColor: ['#FF6F61', '#4CAF50'],
        hoverOffset: 4,
      },
    ],
  };

  // Configurações para o gráfico de pizza
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    maintainAspectRatio: false,
  };

  // Função para rolar até a lista de inadimplentes
  const scrollToInadimplentes = () => {
    const element = document.getElementById('inadimplentes-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <section className="chart-section">
          <div className="pie-chart-container">
            <h3>Inadimplência de Inquilinos</h3>
            <div className="pie-chart">
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>
        </section>

        <section className="tenant-summary">
          <div className="summary">
            <h3>Porcentagem de Inadimplentes:</h3>
            <p>{porcentagemInadimplentes}% dos inquilinos estão inadimplentes.</p>
          </div>

          <div className="tenant-list">
            <h3 id="inadimplentes-list">Inquilinos Inadimplentes</h3>
            {inadimplentes.length > 0 ? (
              <div className="tenant-list-scroll">
                <table className="tenant-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor Devido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inadimplentes.map((tenant) => (
                      <tr key={tenant.id}>
                        <td>{tenant.name}</td>
                        <td>R${(tenant.rentValue * tenant.inadimplenceTime).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Não há inquilinos inadimplentes.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TenantInfos;
