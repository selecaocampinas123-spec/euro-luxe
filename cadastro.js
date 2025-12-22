// Euro Luxe - Cadastro Clean (v1.0)
console.log('--- SISTEMA NOVO DE CADASTRO INICIADO ---');

const SUPABASE_URL = 'https://mfraaqpmenqwwkbwaodi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcmFhcXBtZW5xd3drYndhb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjczODYsImV4cCI6MjA0OTYwMzM4Nn0.g04gK88qCpKz5nnJdV4nMIuO49H00tKWPjfXIo7_lyw';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function get(id) { return document.getElementById(id).value; }

window.showStep = function (stepNum) {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'none';

    document.getElementById('step-' + stepNum).style.display = 'block';
    window.scrollTo(0, 0);
}

window.goToStep2 = function () {
    // Validação Manual Simples
    if (!get('username') || !get('email') || !get('password') || !get('fullName') || !get('city')) {
        alert('Por favor, preencha todos os campos obrigatórios da Etapa 1.');
        return;
    }
    if (get('password').length < 6) {
        alert('A senha precisa ter pelo menos 6 caracteres.');
        return;
    }

    showStep(2);
}

window.finishRegistration = async function () {
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
            password_hash: btoa(get('password')), // Hash simples para demo
            status: 'pending'
        };

        const { error } = await supabase.from('profiles').insert([payload]);

        if (error) throw error;

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'activate.html';

    } catch (e) {
        alert('Erro ao salvar: ' + e.message);
        btn.disabled = false;
        btn.innerText = 'FINALIZAR CADASTRO';
    }
}
