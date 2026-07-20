// ============================================
// SELEÇÃO DE ELEMENTOS
// ============================================

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberCheckbox = document.getElementById('remember');
const loginButton = document.querySelector('.login-button');
const loginMessage = document.getElementById('loginMessage');
const googleBtn = document.getElementById('googleBtn');
const githubBtn = document.getElementById('githubBtn');
const forgotPasswordLink = document.querySelector('.forgot-password');
const signupLink = document.querySelector('.signup-link');

// ============================================
// VALIDAÇÃO DE EMAIL
// ============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// TOGGLE DE VISIBILIDADE DA SENHA
// ============================================

togglePasswordBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const isPasswordVisible = passwordInput.type === 'text';
    
    if (isPasswordVisible) {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️';
    } else {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '🙈';
    }
});

// ============================================
// VALIDAÇÃO EM TEMPO REAL
// ============================================

emailInput.addEventListener('blur', function() {
    const emailError = document.getElementById('emailError');
    
    if (this.value.trim() === '') {
        emailError.textContent = 'Email é obrigatório';
        this.classList.add('error');
    } else if (!isValidEmail(this.value)) {
        emailError.textContent = 'Email inválido';
        this.classList.add('error');
    } else {
        emailError.textContent = '';
        this.classList.remove('error');
    }
});

emailInput.addEventListener('focus', function() {
    document.getElementById('emailError').textContent = '';
    this.classList.remove('error');
});

passwordInput.addEventListener('blur', function() {
    const passwordError = document.getElementById('passwordError');
    
    if (this.value.trim() === '') {
        passwordError.textContent = 'Senha é obrigatória';
        this.classList.add('error');
    } else if (this.value.length < 6) {
        passwordError.textContent = 'Senha deve ter no mínimo 6 caracteres';
        this.classList.add('error');
    } else {
        passwordError.textContent = '';
        this.classList.remove('error');
    }
});

passwordInput.addEventListener('focus', function() {
    document.getElementById('passwordError').textContent = '';
    this.classList.remove('error');
});

// ============================================
// SUBMISSÃO DO FORMULÁRIO
// ============================================

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpar mensagens anteriores
    loginMessage.className = '';
    loginMessage.textContent = '';
    
    // Validar campos
    let isValid = true;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Validar email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email é obrigatório';
        emailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Email inválido';
        emailInput.classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
    }
    
    // Validar senha
    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Senha é obrigatória';
        passwordInput.classList.add('error');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'Senha deve ter no mínimo 6 caracteres';
        passwordInput.classList.add('error');
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
    }
    
    if (!isValid) {
        return;
    }
    
    // Desabilitar botão durante o envio
    loginButton.disabled = true;
    loginButton.textContent = 'Entrando...';
    
    // Simular requisição ao servidor
    setTimeout(() => {
        // Aqui você faria uma requisição real ao seu servidor
        // Exemplo com fetch:
        /*
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value,
                remember: rememberCheckbox.checked
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Salvar token ou sessão
                if (rememberCheckbox.checked) {
                    localStorage.setItem('userEmail', emailInput.value);
                }
                
                // Redirecionar para dashboard
                window.location.href = '/dashboard';
            } else {
                showError(data.message || 'Erro ao fazer login');
            }
        })
        .catch(error => {
            showError('Erro de conexão. Tente novamente.');
            console.error('Erro:', error);
        })
        .finally(() => {
            loginButton.disabled = false;
            loginButton.textContent = 'Entrar';
        });
        */
        
        // Para demonstração, simular sucesso
        showSuccess(`Bem-vindo, ${emailInput.value}!`);
        
        // Limpar formulário
        setTimeout(() => {
            loginForm.reset();
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = '👁️';
            // Aqui você redirecionaria para o dashboard
            // window.location.href = '/dashboard';
        }, 1500);
        
        loginButton.disabled = false;
        loginButton.textContent = 'Entrar';
    }, 1500);
});

// ============================================
// FUNÇÕES DE MENSAGEM
// ============================================

function showSuccess(message) {
    loginMessage.textContent = message;
    loginMessage.className = 'login-message success';
}

function showError(message) {
    loginMessage.textContent = message;
    loginMessage.className = 'login-message error';
}

// ============================================
// LOGIN SOCIAL
// ============================================

googleBtn.addEventListener('click', function() {
    showSuccess('Redirecionando para Google...');
    // Aqui você implementaria a autenticação com Google
    // window.location.href = 'https://accounts.google.com/...';
    setTimeout(() => {
        loginMessage.className = '';
        loginMessage.textContent = '';
    }, 2000);
});

githubBtn.addEventListener('click', function() {
    showSuccess('Redirecionando para GitHub...');
    // Aqui você implementaria a autenticação com GitHub
    // window.location.href = 'https://github.com/login/oauth/...';
    setTimeout(() => {
        loginMessage.className = '';
        loginMessage.textContent = '';
    }, 2000);
});

// ============================================
// LINKS ADICIONAIS
// ============================================

forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    showSuccess('Link de recuperação de senha enviado para seu email!');
    setTimeout(() => {
        loginMessage.className = '';
        loginMessage.textContent = '';
    }, 3000);
});

signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    showSuccess('Redirecionando para página de cadastro...');
    // window.location.href = '/signup';
});

// ============================================
// CARREGAR EMAIL SALVO (SE LEMBRAR-ME FOI MARCADO)
// ============================================

window.addEventListener('load', function() {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});

// ============================================
// SALVAR EMAIL AO MARCAR "LEMBRAR-ME"
// ============================================

rememberCheckbox.addEventListener('change', function() {
    if (this.checked && emailInput.value) {
        localStorage.setItem('userEmail', emailInput.value);
    } else {
        localStorage.removeItem('userEmail');
    }
});

// ============================================
// ENTER PARA SUBMETER FORMULÁRIO
// ============================================

passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// ============================================
// FEEDBACK VISUAL AO DIGITAR
// ============================================

emailInput.addEventListener('input', function() {
    if (this.classList.contains('error') && isValidEmail(this.value)) {
        this.classList.remove('error');
        document.getElementById('emailError').textContent = '';
    }
});

passwordInput.addEventListener('input', function() {
    if (this.classList.contains('error') && this.value.length >= 6) {
        this.classList.remove('error');
        document.getElementById('passwordError').textContent = '';
    }
});
