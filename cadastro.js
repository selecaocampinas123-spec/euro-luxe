// Euro Luxe - Cadastro Clean (v2.0 - Bulletproof)
console.log('--- SISTEMA BLINDADO INICIADO ---');

// 1. Definições de UI (Garantia de Navegação)
function get(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

window.showStep = function (stepNum) {
    console.log('Navegando para etapa:', stepNum);
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'none';

    document.getElementById('step-' + stepNum).style.display = 'block';
    window.scrollTo(0, 0);
}

window.goToStep2 = function () {
    console.log('Botão Próximo Clicado');

    // Validação
    const required = ['username', 'email', 'password', 'fullName', 'city', 'birthDate'];
    for (let id of required) {
        if (!get(id)) {
            alert('Preencha todos os campos obrigatórios.');
            document.getElementById(id).focus();
            return;
        }
    }

    if (get('password').length < 6) {
        alert('A senha precisa ter pelo menos 6 caracteres.');
        document.getElementById('password').focus();
        return;
    }

    showStep(2);
}

// 2. Inicialização do Banco (Segura)
const SUPABASE_URL = 'https://mfraaqpmenqwwkbwaodi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcmFhcXBtZW5xd3drYndhb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjczODYsImV4cCI6MjA0OTYwMzM4Nn0.g04gK88qCpKz5nnJdV4nMIuO49H00tKWPjfXIo7_lyw';

let supabase = null;

try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase Conectado.');
    } else {
        console.error('Biblioteca Supabase não carregada.');
    }
} catch (e) {
    console.error('Erro ao iniciar Supabase:', e);
}

// 3. Função de Salvar (Com verificação de conexão)
window.finishRegistration = async function () {
    console.log('Finalizando cadastro...');

    if (!supabase) {
        alert('Erro Crítico: Não foi possível conectar ao banco de dados. Verifique se sua internet bloqueia conexões externas ou scripts.');
        return;
    }

    const btn = document.querySelector('#step-2 .btn-primary');

    if (!get('description') || !get('goal')) {
        alert('Preencha a descrição e o objetivo.');
        return;
    }

    btn.disabled = true;
    btn.innerText = 'Salvando...';

    try {
        const payload = {
            username: get('username'),
            email: get('email'),
            full_name: get('fullName'),
            birth_date: get('birthDate'),
            city: get('city'),
            phone: get('phone'),
            password_hash: btoa(get('password')),
            status: 'pending'
        };

        const { error } = await supabase.from('profiles').insert([payload]);

        if (error) throw error;

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'activate.html';

    } catch (e) {
        alert('Erro ao salvar: ' + (e.message || e));
        btn.disabled = false;
        btn.innerText = 'FINALIZAR CADASTRO';
    }
}
