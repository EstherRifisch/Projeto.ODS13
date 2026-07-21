/* ========================================
   CLIMATRACK - AUTENTICAÇÃO E FUNÇÕES (AUTH.JS)
   Gerencia login, cadastro e funcionalidades da área do usuário
   ======================================== */

/* ========== INICIALIZAÇÃO ========== */
document.addEventListener('DOMContentLoaded', () => {
    /* Criar usuário padrão para facilitar testes */
    setupDefaultUser();

    if (window.location.pathname.includes('login')) {
        initLoginPage();
    }
    
    if (window.location.pathname.includes('area-usuario')) {
        checkUserAuth();
        loadUserDashboardData();
    }
    
    updateNavigation();
});

/* Usuário padrão para teste rápido */
function setupDefaultUser() {
    const defaultUser = {
        name: "Esther Santos",
        email: "admin@climatrack.com",
        password: "123",
        createdAt: new Date().toISOString()
    };
    if (!localStorage.getItem('climatrack_user_admin@climatrack.com')) {
        localStorage.setItem('climatrack_user_admin@climatrack.com', JSON.stringify(defaultUser));
    }
}

/* ========== NAVEGAÇÃO ========== */
function updateNavigation() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;
    
    const userData = JSON.parse(localStorage.getItem('climatrack_user'));
    
    if (userData) {
        navAuth.innerHTML = `
            <span style="margin-right: 15px; color: #1B5E20; font-weight: 600;">Olá, ${userData.name.split(' ')[0]}</span>
            <a href="area-usuario.html" class="btn btn-secondary" style="margin-right: 10px;">Minha Área</a>
            <button class="btn btn-logout" onclick="logout()">Sair</button>
        `;
    }
}

/* ========== LOGIN E CADASTRO ========== */
function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const storedData = localStorage.getItem('climatrack_user_' + email);
    if (!storedData) {
        alert('Usuário não encontrado! Por favor, cadastre-se.');
        return;
    }
    
    const userData = JSON.parse(storedData);
    if (userData.password !== password) {
        alert('Senha incorreta!');
        return;
    }
    
    localStorage.setItem('climatrack_user', JSON.stringify({
        name: userData.name,
        email: userData.email
    }));
    
    alert('Login realizado com sucesso!');
    window.location.href = 'area-usuario.html';
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (localStorage.getItem('climatrack_user_' + email)) {
        alert('Este email já está cadastrado!');
        return;
    }
    
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    localStorage.setItem('climatrack_user_' + email, JSON.stringify(newUser));
    localStorage.setItem('climatrack_user', JSON.stringify({ name, email }));
    
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'area-usuario.html';
}

function logout() {
    localStorage.removeItem('climatrack_user');
    alert('Você saiu do sistema.');
    window.location.href = 'index.html';
}

function checkUserAuth() {
    if (!localStorage.getItem('climatrack_user')) {
        window.location.href = 'login.html';
    }
}

/* ========== FUNCIONALIDADES DA ÁREA DO USUÁRIO ========== */

/* 1. Gerar Relatório */
function generateReport() {
    const userData = JSON.parse(localStorage.getItem('climatrack_user'));
    const reportContent = `
        RELATÓRIO CLIMATRACK - MONITORAMENTO AMBIENTAL
        -------------------------------------------
        Usuário: ${userData.name}
        Data: ${new Date().toLocaleDateString('pt-BR')}
        
        RESUMO DO MONITORAMENTO:
        - Temperatura Global: Tendência de alta (+1.32°C em 2024)
        - Desmatamento: Alerta crítico em regiões da Amazônia
        - Qualidade do Ar: Níveis moderados em grandes centros
        
        DICA DO DIA: Reduza o consumo de plástico e prefira transporte sustentável.
        -------------------------------------------
        ClimaTrack 2026 - Protegendo o Futuro.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatorio_ClimaTrack_${userData.name.replace(' ', '_')}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    alert('Relatório gerado e baixado com sucesso!');
}

/* 2. Editar Perfil (Simulado) */
function editProfile() {
    const userData = JSON.parse(localStorage.getItem('climatrack_user'));
    const newName = prompt("Digite seu novo nome:", userData.name);
    
    if (newName && newName !== userData.name) {
        userData.name = newName;
        localStorage.setItem('climatrack_user', JSON.stringify(userData));
        
        /* Atualizar no banco simulado também */
        const fullData = JSON.parse(localStorage.getItem('climatrack_user_' + userData.email));
        fullData.name = newName;
        localStorage.setItem('climatrack_user_' + userData.email, JSON.stringify(fullData));
        
        document.getElementById('user-name').textContent = newName;
        alert('Perfil atualizado com sucesso!');
    }
}

/* 3. Acessar Comunidade (Mural de Ações) */
function accessCommunity() {
    const actions = [
        "Plantei uma árvore hoje! 🌱",
        "Comecei a fazer compostagem em casa. ♻️",
        "Troquei o carro pela bike no trajeto pro trabalho. 🚲",
        "Reduzi meu tempo de banho para economizar água. 💧"
    ];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    alert("Mural da Comunidade ClimaTrack:\n\nÚltima ação compartilhada: \n\"" + randomAction + "\"\n\nParticipe você também!");
}

/* Alternar Formulários */
function toggleForm(e) {
    e.preventDefault();
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const backToLogin = document.getElementById('back-to-login');
    const loginToggle = document.querySelector('.login-toggle');
    
    if (loginForm.style.display !== 'none') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        backToLogin.style.display = 'block';
        loginToggle.style.display = 'none';
        document.querySelector('.login-card h1').textContent = 'Cadastro';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        backToLogin.style.display = 'none';
        loginToggle.style.display = 'block';
        document.querySelector('.login-card h1').textContent = 'Bem-vindo';
    }
}
