/* ========================================
   CLIMATRACK - JAVASCRIPT (SCRIPT.JS)
   Comentários explicando cada função e linha
   ======================================== */

/* ========== INICIALIZAÇÃO DO DOCUMENTO ========== */
/* Aguarda o carregamento completo do DOM antes de executar o JavaScript */
document.addEventListener('DOMContentLoaded', () => {
    /* Obtém o caminho da página atual */
    const currentPage = window.location.pathname;
    
    /* Verifica se a página atual é a página de dados */
    if (currentPage.includes('dados')) {
        /* Se for, inicializa as funcionalidades do dashboard */
        initDashboard();
    }
    
    /* Atualiza o link ativo do menu de navegação */
    updateActiveNavLink();
});

/* ========== AUTENTICAÇÃO ========== */
/* Função que atualiza a navegação baseado no status de login */
function updateNavigationAuth() {
    /* Obtém o container de autenticação do navbar */
    const navAuth = document.getElementById('nav-auth');
    
    /* Verifica se o container existe na página */
    if (!navAuth) return;
    
    /* Obtém os dados do usuário do localStorage */
    const userData = JSON.parse(localStorage.getItem('climatrack_user'));
    
    /* Se o usuário está logado */
    if (userData) {
        /* Limpa o container */
        navAuth.innerHTML = '';
        
        /* Cria um span com o nome do usuário */
        const userSpan = document.createElement('span');
        userSpan.style.marginRight = '15px';
        userSpan.style.color = '#1B5E20';
        userSpan.style.fontWeight = '600';
        userSpan.textContent = `Olá, ${userData.name}`;
        
        /* Adiciona o span ao container */
        navAuth.appendChild(userSpan);
        
        /* Cria um link para a área do usuário */
        const userLink = document.createElement('a');
        userLink.href = 'area-usuario.html';
        userLink.className = 'btn btn-secondary';
        userLink.textContent = 'Minha Área';
        
        /* Adiciona o link ao container */
        navAuth.appendChild(userLink);
        
        /* Cria um espaço em branco */
        const space = document.createElement('span');
        space.style.marginRight = '10px';
        
        /* Adiciona o espaço ao container */
        navAuth.appendChild(space);
        
        /* Cria um botão de logout */
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn btn-logout';
        logoutBtn.textContent = 'Sair';
        logoutBtn.onclick = () => {
            localStorage.removeItem('climatrack_user');
            window.location.href = 'index.html';
        };
        
        /* Adiciona o botão ao container */
        navAuth.appendChild(logoutBtn);
    }
}

/* ========== NAVEGAÇÃO ========== */
/* Função que atualiza qual link do menu está ativo */
function updateActiveNavLink() {
    /* Obtém o caminho da página atual */
    const currentPage = window.location.pathname;
    
    /* Seleciona todos os links do menu */
    const navLinks = document.querySelectorAll('.nav-link');
    
    /* Itera sobre cada link do menu */
    navLinks.forEach(link => {
        /* Remove a classe 'active' de todos os links */
        link.classList.remove('active');
        
        /* Verifica se a página atual é a página de dados */
        if (currentPage.includes('dados') && link.href.includes('dados')) {
            /* Se for, adiciona a classe 'active' ao link */
            link.classList.add('active');
        } 
        /* Verifica se a página atual é a página sobre nós */
        else if (currentPage.includes('sobre') && link.href.includes('sobre')) {
            /* Se for, adiciona a classe 'active' ao link */
            link.classList.add('active');
        } 
        /* Verifica se a página atual é a página de contato */
        else if (currentPage.includes('contato') && link.href.includes('contato')) {
            /* Se for, adiciona a classe 'active' ao link */
            link.classList.add('active');
        } 
        /* Verifica se a página atual é a página inicial */
        else if ((currentPage.endsWith('/') || currentPage.endsWith('index.html')) && link.href.includes('index')) {
            /* Se for, adiciona a classe 'active' ao link */
            link.classList.add('active');
        }
    });
}

/* ========== DASHBOARD ========== */
/* Função que inicializa todas as funcionalidades do dashboard */
function initDashboard() {
    /* Inicializa os gráficos */
    initCharts();
    /* Inicializa o mapa */
    initMap();
    /* Carrega os alertas */
    loadAlerts();
    /* Carrega a qualidade do ar */
    loadAirQuality();
}

/* ========== GRÁFICOS DINÂMICOS ========== */
/* Função que inicializa todos os gráficos */
function initCharts() {
    /* Seleciona o elemento canvas do gráfico de temperatura */
    const tempChartElement = document.getElementById('tempChart');
    /* Seleciona o elemento canvas do gráfico de desmatamento */
    const forestChartElement = document.getElementById('forestChart');
    
    /* Verifica se o elemento de gráfico de temperatura existe na página */
    if (tempChartElement) {
        /* Se existir, cria o gráfico de temperatura */
        createTemperatureChart();
    }
    
    /* Verifica se o elemento de gráfico de desmatamento existe na página */
    if (forestChartElement) {
        /* Se existir, cria o gráfico de desmatamento */
        createForestChart();
    }
}

/* Função que cria o gráfico de temperatura */
function createTemperatureChart() {
    /* Obtém o contexto 2D do canvas para desenhar */
    const ctx = document.getElementById('tempChart').getContext('2d');
    
    /* Cria um novo gráfico usando a biblioteca Chart.js */
    new Chart(ctx, {
        /* Define o tipo de gráfico como linha */
        type: 'line',
        /* Dados do gráfico */
        data: {
            /* Labels (rótulos) do eixo X */
            labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            /* Array com os datasets (conjuntos de dados) */
            datasets: [{
                /* Rótulo do dataset que aparece na legenda */
                label: 'Variação de Temperatura (°C)',
                /* Dados do gráfico (valores Y) */
                data: [0.85, 0.98, 1.02, 0.95, 1.10, 1.25, 1.32],
                /* Cor da linha */
                borderColor: '#e67e22',
                /* Cor de fundo da área abaixo da linha */
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
                /* Preenche a área abaixo da linha */
                fill: true,
                /* Suavidade da linha (curva) */
                tension: 0.4,
                /* Largura da linha */
                borderWidth: 3,
                /* Raio dos pontos na linha */
                pointRadius: 5,
                /* Cor de fundo dos pontos */
                pointBackgroundColor: '#e67e22',
                /* Cor da borda dos pontos */
                pointBorderColor: '#fff',
                /* Largura da borda dos pontos */
                pointBorderWidth: 2,
                /* Raio dos pontos ao passar o mouse */
                pointHoverRadius: 7
            }]
        },
        /* Opções de configuração do gráfico */
        options: {
            /* Responsivo em diferentes tamanhos de tela */
            responsive: true,
            /* Mantém a proporção do gráfico */
            maintainAspectRatio: true,
            /* Plugins (extensões) do gráfico */
            plugins: {
                /* Configurações da legenda */
                legend: {
                    /* Exibe a legenda */
                    display: true,
                    /* Configurações dos rótulos da legenda */
                    labels: {
                        /* Tamanho da fonte */
                        font: { size: 12, family: "'Poppins', sans-serif" },
                        /* Cor do texto */
                        color: '#2c3e50',
                        /* Espaço interno */
                        padding: 15
                    }
                }
            },
            /* Configurações dos eixos */
            scales: {
                /* Eixo Y (vertical) */
                y: {
                    /* Começa do zero */
                    beginAtZero: false,
                    /* Configurações dos rótulos */
                    ticks: {
                        /* Fonte dos rótulos */
                        font: { family: "'Poppins', sans-serif" },
                        /* Cor dos rótulos */
                        color: '#7f8c8d'
                    },
                    /* Configurações da grade */
                    grid: {
                        /* Cor das linhas da grade */
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                /* Eixo X (horizontal) */
                x: {
                    /* Configurações dos rótulos */
                    ticks: {
                        /* Fonte dos rótulos */
                        font: { family: "'Poppins', sans-serif" },
                        /* Cor dos rótulos */
                        color: '#7f8c8d'
                    },
                    /* Configurações da grade */
                    grid: {
                        /* Não exibe as linhas da grade */
                        display: false
                    }
                }
            }
        }
    });
}

/* Função que cria o gráfico de desmatamento */
function createForestChart() {
    /* Obtém o contexto 2D do canvas para desenhar */
    const ctx = document.getElementById('forestChart').getContext('2d');
    
    /* Cria um novo gráfico usando a biblioteca Chart.js */
    new Chart(ctx, {
        /* Define o tipo de gráfico como barras */
        type: 'bar',
        /* Dados do gráfico */
        data: {
            /* Labels (rótulos) do eixo X */
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            /* Array com os datasets (conjuntos de dados) */
            datasets: [{
                /* Rótulo do dataset que aparece na legenda */
                label: 'Área Alerta (km²)',
                /* Dados do gráfico (valores Y) */
                data: [450, 380, 520, 610, 890, 1100],
                /* Cores de fundo das barras (diferentes para cada uma) */
                backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(230, 126, 34, 0.8)',
                    'rgba(230, 126, 34, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(231, 76, 60, 0.8)'
                ],
                /* Cores das bordas das barras */
                borderColor: [
                    '#27ae60',
                    '#27ae60',
                    '#d68910',
                    '#d68910',
                    '#c0392b',
                    '#c0392b'
                ],
                /* Largura das bordas */
                borderWidth: 2,
                /* Cantos arredondados das barras */
                borderRadius: 8
            }]
        },
        /* Opções de configuração do gráfico */
        options: {
            /* Responsivo em diferentes tamanhos de tela */
            responsive: true,
            /* Mantém a proporção do gráfico */
            maintainAspectRatio: true,
            /* Plugins (extensões) do gráfico */
            plugins: {
                /* Configurações da legenda */
                legend: {
                    /* Exibe a legenda */
                    display: true,
                    /* Configurações dos rótulos da legenda */
                    labels: {
                        /* Tamanho da fonte */
                        font: { size: 12, family: "'Poppins', sans-serif" },
                        /* Cor do texto */
                        color: '#2c3e50',
                        /* Espaço interno */
                        padding: 15
                    }
                }
            },
            /* Configurações dos eixos */
            scales: {
                /* Eixo Y (vertical) */
                y: {
                    /* Começa do zero */
                    beginAtZero: true,
                    /* Configurações dos rótulos */
                    ticks: {
                        /* Fonte dos rótulos */
                        font: { family: "'Poppins', sans-serif" },
                        /* Cor dos rótulos */
                        color: '#7f8c8d'
                    },
                    /* Configurações da grade */
                    grid: {
                        /* Cor das linhas da grade */
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                /* Eixo X (horizontal) */
                x: {
                    /* Configurações dos rótulos */
                    ticks: {
                        /* Fonte dos rótulos */
                        font: { family: "'Poppins', sans-serif" },
                        /* Cor dos rótulos */
                        color: '#7f8c8d'
                    },
                    /* Configurações da grade */
                    grid: {
                        /* Não exibe as linhas da grade */
                        display: false
                    }
                }
            }
        }
    });
}

/* ========== MAPA INTERATIVO ========== */
/* Função que inicializa o mapa interativo */
function initMap() {
    /* Seleciona o elemento onde o mapa será renderizado */
    const mapElement = document.getElementById('map');
    
    /* Verifica se o elemento existe na página */
    if (!mapElement) return;
    
    /* Cria um mapa Leaflet focado no Brasil */
    const map = L.map('map').setView([-15.78, -47.93], 4);
    
    /* Adiciona a camada de tiles do OpenStreetMap */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        /* Atribuição de crédito */
        attribution: '© OpenStreetMap contributors',
        /* Zoom máximo */
        maxZoom: 19
    }).addTo(map);
    
    /* Define os pontos de monitoramento ambiental */
    const locations = [
        {
            /* Nome do local */
            name: "Amazônia - Setor Norte",
            /* Coordenadas [latitude, longitude] */
            coords: [-3.11, -60.02],
            /* Status do monitoramento */
            status: "Crítico",
            /* Cor do marcador */
            color: '#e74c3c'
        },
        {
            name: "Pantanal - Monitoramento",
            coords: [-18.00, -56.00],
            status: "Alerta",
            color: '#f39c12'
        },
        {
            name: "Mata Atlântica - Sul",
            coords: [-25.42, -49.27],
            status: "Normal",
            color: '#2ecc71'
        },
        {
            name: "Cerrado - Centro-Oeste",
            coords: [-15.50, -47.50],
            status: "Alerta",
            color: '#f39c12'
        },
        {
            name: "Caatinga - Nordeste",
            coords: [-8.00, -38.00],
            status: "Normal",
            color: '#2ecc71'
        }
    ];
    
    /* Itera sobre cada local de monitoramento */
    locations.forEach(loc => {
        /* Cria um ícone customizado para o marcador */
        const icon = L.divIcon({
            /* HTML do ícone */
            html: `<div style="background-color: ${loc.color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">📍</div>`,
            /* Tamanho do ícone */
            iconSize: [30, 30],
            /* Classe CSS do ícone */
            className: 'custom-marker'
        });
        
        /* Adiciona o marcador ao mapa */
        L.marker(loc.coords, { icon: icon })
            .addTo(map)
            /* Adiciona um popup ao clicar no marcador */
            .bindPopup(`
                <div style="font-family: 'Poppins', sans-serif;">
                    <!-- Nome do local -->
                    <strong>${loc.name}</strong><br>
                    <!-- Status do local -->
                    Status: <span style="color: ${loc.color}; font-weight: bold;">${loc.status}</span><br>
                    <!-- Data da última atualização -->
                    <small>Último atualizado: hoje</small>
                </div>
            `);
    });
}

/* ========== ALERTAS AMBIENTAIS ========== */
/* Função que carrega os alertas ambientais */
function loadAlerts() {
    /* Seleciona o container onde os alertas serão exibidos */
    const container = document.getElementById('alert-container');
    
    /* Verifica se o container existe na página */
    if (!container) return;
    
    /* Define os alertas que serão exibidos */
    const alerts = [
        {
            /* Emoji do alerta */
            emoji: '🔥',
            /* Mensagem do alerta */
            message: 'Risco alto de queimadas no sudeste do Pará.',
            /* Nível de severidade */
            severity: 'crítico'
        },
        {
            emoji: '🌧️',
            message: 'Alerta de chuvas extremas na região Sul.',
            severity: 'alerta'
        },
        {
            emoji: '🌡️',
            message: 'Onda de calor detectada no Centro-Oeste.',
            severity: 'alerta'
        },
        {
            emoji: '💨',
            message: 'Qualidade do ar prejudicial em São Paulo.',
            severity: 'crítico'
        }
    ];
    
    /* Simula o carregamento de dados com um atraso */
    setTimeout(() => {
        /* Limpa o container */
        container.innerHTML = '';
        
        /* Itera sobre cada alerta */
        alerts.forEach(alert => {
            /* Cria um elemento div para o alerta */
            const div = document.createElement('div');
            /* Adiciona a classe do alerta */
            div.className = 'alert-item';
            /* Espaço abaixo */
            div.style.marginBottom = '10px';
            /* Espaçamento interno */
            div.style.padding = '10px';
            /* Cor de fundo baseada na severidade */
            div.style.backgroundColor = alert.severity === 'crítico' ? '#fadbd8' : '#fdeaa8';
            /* Cantos arredondados */
            div.style.borderRadius = '5px';
            /* Borda esquerda baseada na severidade */
            div.style.borderLeft = `4px solid ${alert.severity === 'crítico' ? '#e74c3c' : '#f39c12'}`;
            /* Conteúdo do alerta */
            div.innerHTML = `${alert.emoji} ${alert.message}`;
            /* Adiciona o alerta ao container */
            container.appendChild(div);
        });
    }, 800); /* Atraso de 800 milissegundos */
}

/* ========== QUALIDADE DO AR ========== */
/* Função que carrega a qualidade do ar */
function loadAirQuality() {
    /* Seleciona o elemento do valor do índice */
    const aqiVal = document.getElementById('aqi-val');
    /* Seleciona o elemento do status */
    const aqiStatus = document.getElementById('aqi-status');
    
    /* Verifica se os elementos existem na página */
    if (!aqiVal || !aqiStatus) return;
    
    /* Simula o carregamento de dados com um atraso */
    setTimeout(() => {
        /* Gera um valor aleatório entre 20 e 120 */
        const val = Math.floor(Math.random() * 100) + 20;
        
        /* Exibe o valor no elemento */
        aqiVal.innerText = val;
        
        /* Declara variáveis para armazenar o status e cores */
        let statusText = '';
        let statusColor = '';
        let circleColor = '';
        
        /* Verifica o valor e define o status apropriado */
        if (val <= 50) {
            /* Se menor ou igual a 50, status é "Bom" */
            statusText = 'Bom 🟢';
            statusColor = '#27ae60';
            circleColor = '#2ecc71';
        } else if (val <= 100) {
            /* Se entre 51 e 100, status é "Moderado" */
            statusText = 'Moderado 🟡';
            statusColor = '#f39c12';
            circleColor = '#f1c40f';
        } else if (val <= 150) {
            /* Se entre 101 e 150, status é "Prejudicial para grupos sensíveis" */
            statusText = 'Prejudicial para grupos sensíveis 🟠';
            statusColor = '#e67e22';
            circleColor = '#e67e22';
        } else {
            /* Se maior que 150, status é "Prejudicial" */
            statusText = 'Prejudicial 🔴';
            statusColor = '#e74c3c';
            circleColor = '#e74c3c';
        }
        
        /* Atualiza o status na página */
        aqiStatus.innerText = statusText;
        /* Aplica a cor do status */
        aqiStatus.style.color = statusColor;
        /* Aplica a cor do círculo */
        aqiVal.style.backgroundColor = circleColor;
    }, 1200); /* Atraso de 1200 milissegundos */
}



/* ========== SMOOTH SCROLL ========== */
/* Seleciona todos os links que começam com # */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    /* Adiciona um listener para o evento de clique */
    anchor.addEventListener('click', function (e) {
        /* Previne o comportamento padrão */
        e.preventDefault();
        
        /* Obtém o elemento alvo do link */
        const target = document.querySelector(this.getAttribute('href'));
        
        /* Verifica se o elemento existe */
        if (target) {
            /* Faz um scroll suave até o elemento */
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* ========== ANIMAÇÕES AO SCROLL ========== */
/* Configurações do Intersection Observer */
const observerOptions = {
    /* Dispara quando 10% do elemento está visível */
    threshold: 0.1,
    /* Margem de espaço para disparar a animação */
    rootMargin: '0px 0px -50px 0px'
};

/* Cria um novo Intersection Observer */
const observer = new IntersectionObserver(function(entries) {
    /* Itera sobre cada entrada observada */
    entries.forEach(entry => {
        /* Verifica se o elemento está visível na tela */
        if (entry.isIntersecting) {
            /* Se estiver, aplica a opacidade total */
            entry.target.style.opacity = '1';
            /* E remove a transformação de translação */
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/* Seleciona todos os cards e items de features */
document.querySelectorAll('.card, .feature-card').forEach(card => {
    /* Define a opacidade inicial como 0 (invisível) */
    card.style.opacity = '0';
    /* Define a translação inicial (sobe um pouco) */
    card.style.transform = 'translateY(20px)';
    /* Define a transição suave */
    card.style.transition = 'all 0.5s ease';
    /* Observa o elemento */
    observer.observe(card);
});

/* ========== FUNÇÃO AUXILIAR: FORMATAR NÚMEROS ========== */
/* Função que formata números com separadores de milhar */
function formatNumber(num) {
    /* Converte o número para string e adiciona pontos como separadores */
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ========== FUNÇÃO AUXILIAR: FORMATAR DATA ========== */
/* Função que formata datas no padrão brasileiro */
function formatDate(date) {
    /* Define as opções de formatação */
    const options = { year: 'numeric', month: 'long', day: 'numeric', locale: 'pt-BR' };
    /* Converte a data para o formato brasileiro */
    return new Date(date).toLocaleDateString('pt-BR', options);
}

/* ========== CONSOLE LOG DE BOAS-VINDAS ========== */
/* Exibe uma mensagem de boas-vindas no console do navegador */
console.log('%c🌍 Bem-vindo ao ClimaTrack!', 'color: #2ecc71; font-size: 20px; font-weight: bold;');
/* Exibe o lema do projeto */
console.log('%cMonitorando o planeta, protegendo o futuro.', 'color: #3498db; font-size: 14px;');
/* Exibe a inspiração do projeto */
console.log('%cInpirado na ODS 13 - Ação Contra a Mudança Global do Clima', 'color: #e67e22; font-size: 12px;');
