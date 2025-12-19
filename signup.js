// Euro Luxe - Cadastro Failsafe (Senior Version)
console.log('--- Script Iniciado ---');

// Configurações do Supabase
const SUPABASE_URL = 'https://mfraaqpmenqwwkbwaodi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcmFhcXBtZW5xd3drYndhb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjczODYsImV4cCI6MjA0OTYwMzM4Nn0.g04gK88qCpKz5nnJdV4nMIuO49H00tKWPjfXIo7_lyw';

let supabase;
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.error('Supabase init error:', e);
}

let currentStep = 1;
const totalSteps = 5;
let uploadedFiles = [];
let profilePhotoIndex = 0;

// Função principal de inicialização
function initRegistration() {
    console.log('Inicializando sistema de registro...');

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');

    if (!nextBtn) {
        console.error('ERROR: nextBtn not found!');
        return;
    }

    // Limpar listeners antigos se houver (caso o script rode duas vezes)
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    newNextBtn.onclick = async function (e) {
        e.preventDefault();
        console.log('Avançar clicado. Step:', currentStep);

        const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (!currentStepEl) return;

        // Validação Simplificada
        const inputs = Array.from(currentStepEl.querySelectorAll('input[required], textarea[required]'));
        let stepValid = true;
        let missingField = '';

        for (const input of inputs) {
            const val = input.value ? input.value.trim() : '';
            if (!val) {
                stepValid = false;
                input.style.borderColor = 'red';
                missingField = input.parentElement.querySelector('label')?.innerText || input.id;
                break;
            } else {
                input.style.borderColor = '#ddd';
            }
        }

        // Senhas na etapa 1
        if (currentStep === 1) {
            const p1 = document.getElementById('password');
            const p2 = document.getElementById('password_confirm');
            if (p1 && p1.value.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            if (p1 && p2 && p1.value !== p2.value) {
                alert('As senhas não coincidem.');
                return;
            }
        }

        if (!stepValid) {
            alert('Por favor, preencha: ' + missingField.replace('*', ''));
            return;
        }

        // Transição
        if (currentStep < totalSteps) {
            currentStepEl.classList.remove('active');
            currentStep++;
            const nextStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            if (nextStepEl) {
                nextStepEl.classList.add('active');
                if (progressFill) progressFill.style.width = (currentStep / totalSteps) * 100 + '%';
                if (prevBtn) prevBtn.style.display = 'block';
                if (currentStep === totalSteps) newNextBtn.textContent = 'Finalizar Registro';
                window.scrollTo(0, 0);
            }
        } else {
            await finalizeRegistration(newNextBtn);
        }
    };

    if (prevBtn) {
        prevBtn.onclick = function (e) {
            e.preventDefault();
            if (currentStep > 1) {
                document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
                currentStep--;
                document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
                if (progressFill) progressFill.style.width = (currentStep / totalSteps) * 100 + '%';
                if (currentStep === 1) prevBtn.style.display = 'none';
                newNextBtn.textContent = 'Avançar →';
                window.scrollTo(0, 0);
            }
        };
    }
}

async function finalizeRegistration(btn) {
    if (!supabase) {
        alert('Erro de conexão. Tente novamente.');
        return;
    }

    try {
        btn.disabled = true;
        btn.textContent = 'Salvando...';

        const data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            full_name: document.getElementById('fullName').value,
            birth_date: document.getElementById('birthDate').value,
            city: document.getElementById('estado_pais').value,
            phone: document.getElementById('whatsapp')?.value || null,
            password_hash: btoa(document.getElementById('password').value),
            status: 'pending'
        };

        // Enviar para o banco
        const { error } = await supabase.from('profiles').insert([data]);
        if (error) throw error;

        window.location.href = 'activate.html';
    } catch (err) {
        alert('Erro ao salvar: ' + err.message);
        btn.disabled = false;
        btn.textContent = 'Finalizar Registro';
    }
}

// Inicia imediatamente ou quando o DOM estiver pronto
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initRegistration();
} else {
    document.addEventListener('DOMContentLoaded', initRegistration);
}

// Lógica de fotos (simplificada)
document.addEventListener('change', (e) => {
    if (e.target.id === 'fileInput') {
        const files = Array.from(e.target.files);
        const grid = document.getElementById('previewGrid');
        files.forEach(file => {
            if (uploadedFiles.length < 4) {
                uploadedFiles.push(file);
                const reader = new FileReader();
                reader.onload = (re) => {
                    const item = document.createElement('div');
                    item.className = 'preview-item';
                    item.innerHTML = `<img src="${re.target.result}"><div class="preview-remove">×</div>`;
                    grid.appendChild(item);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Arrastar e soltar básico
const area = document.getElementById('uploadArea');
if (area) {
    area.onclick = () => document.getElementById('fileInput').click();
}
