/* ========================================
   CLIMATRACK - AUTENTICAÇÃO (AUTH.JS)
   Gerencia login, cadastro e proteção de páginas
   ======================================== */

/* ========== INICIALIZAÇÃO ========== */
/* Aguarda o carregamento completo do DOM antes de executar o JavaScript */
document.addEventListener('DOMContentLoaded', () => {
    /* Verifica se está na página de login */
    if (window.location.pathname.includes('login')) {
        /* Inicializa os listeners dos formulários */
        initLoginPage();
    }
    
    /* Verifica se está na página da área do usuário */
    if (window.location.pathname.includes('area-usuario')) {
        /* Verifica se o usuário está logado */
        checkUserAuth();
    }
    
    /* Atualiza a navegação baseado no status de login */
    updateNavigation();
});

/* ========== NAVEGAÇÃO ========== */
/* Função que atualiza a navegação baseado no status de login */
function updateNavigation() {
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
        logoutBtn.onclick = logout;
        
        /* Adiciona o botão ao container */
        navAuth.appendChild(logoutBtn);
    }
}

/* ========== PÁGINA DE LOGIN ========== */
/* Função que inicializa os listeners da página de login */
function initLoginPage() {
    /* Obtém o formulário de login */
    const loginForm = document.getElementById('login-form');
    
    /* Adiciona um listener para o evento de envio do formulário */
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    /* Obtém o formulário de cadastro */
    const signupForm = document.getElementById('signup-form');
    
    /* Adiciona um listener para o evento de envio do formulário */
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

/* ========== LOGIN ========== */
/* Função que trata o envio do formulário de login */
function handleLogin(e) {
    /* Previne o comportamento padrão do formulário */
    e.preventDefault();
    
    /* Obtém o valor do email */
    const email = document.getElementById('email').value;
    
    /* Obtém o valor da senha */
    const password = document.getElementById('password').value;
    
    /* Valida se o email e a senha foram preenchidos */
    if (!email || !password) {
        /* Exibe um alerta */
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    /* Valida se o email tem um formato válido */
    if (!isValidEmail(email)) {
        /* Exibe um alerta */
        alert('Por favor, insira um email válido!');
        return;
    }
    
    /* Obtém os dados do usuário do localStorage */
    const userData = JSON.parse(localStorage.getItem('climatrack_user_' + email));
    
    /* Verifica se o usuário existe */
    if (!userData) {
        /* Exibe um alerta */
        alert('Email ou senha incorretos!');
        return;
    }
    
    /* Verifica se a senha está correta */
    if (userData.password !== password) {
        /* Exibe um alerta */
        alert('Email ou senha incorretos!');
        return;
    }
    
    /* Salva os dados do usuário no localStorage (sem a senha) */
    localStorage.setItem('climatrack_user', JSON.stringify({
        name: userData.name,
        email: userData.email
    }));
    
    /* Exibe uma mensagem de sucesso */
    alert('Login realizado com sucesso!');
    
    /* Redireciona para a área do usuário */
    window.location.href = 'area-usuario.html';
}

/* ========== CADASTRO ========== */
/* Função que trata o envio do formulário de cadastro */
function handleSignup(e) {
    /* Previne o comportamento padrão do formulário */
    e.preventDefault();
    
    /* Obtém o valor do nome */
    const name = document.getElementById('name').value;
    
    /* Obtém o valor do email */
    const email = document.getElementById('signup-email').value;
    
    /* Obtém o valor da senha */
    const password = document.getElementById('signup-password').value;
    
    /* Valida se todos os campos foram preenchidos */
    if (!name || !email || !password) {
        /* Exibe um alerta */
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    /* Valida se o email tem um formato válido */
    if (!isValidEmail(email)) {
        /* Exibe um alerta */
        alert('Por favor, insira um email válido!');
        return;
    }
    
    /* Valida se a senha tem pelo menos 6 caracteres */
    if (password.length < 6) {
        /* Exibe um alerta */
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    /* Verifica se o email já está cadastrado */
    if (localStorage.getItem('climatrack_user_' + email)) {
        /* Exibe um alerta */
        alert('Este email já está cadastrado!');
        return;
    }
    
    /* Cria um objeto com os dados do usuário */
    const newUser = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    /* Salva os dados do usuário no localStorage */
    localStorage.setItem('climatrack_user_' + email, JSON.stringify(newUser));
    
    /* Salva os dados do usuário como usuário ativo */
    localStorage.setItem('climatrack_user', JSON.stringify({
        name: newUser.name,
        email: newUser.email
    }));
    
    /* Exibe uma mensagem de sucesso */
    alert('Cadastro realizado com sucesso! Bem-vindo(a) ao ClimaTrack!');
    
    /* Redireciona para a área do usuário */
    window.location.href = 'area-usuario.html';
}

/* ========== LOGOUT ========== */
/* Função que trata o logout */
function logout() {
    /* Remove os dados do usuário do localStorage */
    localStorage.removeItem('climatrack_user');
    
    /* Exibe uma mensagem de despedida */
    alert('Você foi desconectado com sucesso!');
    
    /* Redireciona para a página inicial */
    window.location.href = 'index.html';
}

/* ========== VERIFICAÇÃO DE AUTENTICAÇÃO ========== */
/* Função que verifica se o usuário está autenticado */
function checkUserAuth() {
    /* Obtém os dados do usuário do localStorage */
    const userData = JSON.parse(localStorage.getItem('climatrack_user'));
    
    /* Se o usuário não está logado */
    if (!userData) {
        /* Redireciona para a página de login */
        window.location.href = 'login.html';
    }
}

/* ========== ALTERNÂNCIA DE FORMULÁRIOS ========== */
/* Função que alterna entre os formulários de login e cadastro */
function toggleForm(e) {
    /* Previne o comportamento padrão do link */
    e.preventDefault();
    
    /* Obtém o formulário de login */
    const loginForm = document.getElementById('login-form');
    
    /* Obtém o formulário de cadastro */
    const signupForm = document.getElementById('signup-form');
    
    /* Obtém o link de volta para login */
    const backToLogin = document.getElementById('back-to-login');
    
    /* Obtém o container de toggle do login */
    const loginToggle = document.querySelector('.login-toggle');
    
    /* Verifica qual formulário está visível */
    if (loginForm.style.display !== 'none') {
        /* Se o formulário de login está visível, oculta ele */
        loginForm.style.display = 'none';
        
        /* Exibe o formulário de cadastro */
        signupForm.style.display = 'block';
        
        /* Exibe o link de volta para login */
        backToLogin.style.display = 'block';
        
        /* Oculta o container de toggle do login */
        loginToggle.style.display = 'none';
        
        /* Muda o título do card */
        document.querySelector('.login-card h1').textContent = 'Cadastro';
        
        /* Muda o subtítulo do card */
        document.querySelector('.login-card p').textContent = 'Crie sua conta para acessar dados ambientais exclusivos';
    } else {
        /* Se o formulário de cadastro está visível, oculta ele */
        signupForm.style.display = 'none';
        
        /* Exibe o formulário de login */
        loginForm.style.display = 'block';
        
        /* Oculta o link de volta para login */
        backToLogin.style.display = 'none';
        
        /* Exibe o container de toggle do login */
        loginToggle.style.display = 'block';
        
        /* Muda o título do card */
        document.querySelector('.login-card h1').textContent = 'Bem-vindo';
        
        /* Muda o subtítulo do card */
        document.querySelector('.login-card p').textContent = 'Acesse sua conta para explorar dados ambientais exclusivos';
    }
}

/* ========== FUNÇÕES AUXILIARES ========== */
/* Função que valida se um email tem um formato válido */
function isValidEmail(email) {
    /* Expressão regular para validar email */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    /* Retorna true se o email é válido, false caso contrário */
    return emailRegex.test(email);
}

/* ========== CONSOLE LOG DE BOAS-VINDAS ========== */
/* Exibe uma mensagem de boas-vindas no console do navegador */
console.log('%c🔐 Sistema de Autenticação ClimaTrack Ativo', 'color: #1B5E20; font-size: 16px; font-weight: bold;');
/* Exibe uma mensagem informativa */
console.log('%cDados armazenados localmente para demonstração', 'color: #4E6E58; font-size: 12px;');
