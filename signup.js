// Euro Luxe - Cadastro Failsafe (Final Senior Version)
console.log('--- Script Iniciado v2.0 ---');

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

function initRegistration() {
    console.log('Iniciando listeners de registro...');

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressFill = document.getElementById('progressFill');

    if (!nextBtn) return;

    // Handler Direto (Failsafe)
    nextBtn.onclick = async function (e) {
        e.preventDefault();
        console.log('Ação disparada no botão de avanço.');

        try {
            const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            if (!currentStepEl) throw new Error("Passo atual não encontrado no DOM");

            // 1. Validação Nativa
            const inputs = Array.from(currentStepEl.querySelectorAll('input, textarea'));
            let allValid = true;
            let firstInvalid = null;

            for (const input of inputs) {
                if (input.hasAttribute('required')) {
                    if (!input.value || !input.value.trim()) {
                        allValid = false;
                        if (!firstInvalid) firstInvalid = input;
                    }
                }
                // Validação de formato (email, date, etc)
                if (input.checkValidity && !input.checkValidity()) {
                    allValid = false;
                    if (!firstInvalid) firstInvalid = input;
                }
            }

            // 2. Regras de Negócio (Senhas)
            if (currentStep === 1) {
                const pass = document.getElementById('password');
                const conf = document.getElementById('password_confirm');
                if (pass && pass.value.length < 6) {
                    alert('A senha deve ter no mínimo 6 caracteres.');
                    pass.focus();
                    return;
                }
                if (pass && conf && pass.value !== conf.value) {
                    alert('As senhas não coincidem.');
                    conf.focus();
                    return;
                }
            }

            if (!allValid) {
                if (firstInvalid) {
                    firstInvalid.reportValidity(); // Mostra o balão nativo do navegador
                    firstInvalid.focus();
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                }
                return;
            }

            // 3. Avançar ou Salvar
            if (currentStep < totalSteps) {
                console.log(`Avançando do passo ${currentStep} para ${currentStep + 1}`);
                currentStepEl.classList.remove('active');
                currentStep++;
                const nextStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
                if (nextStepEl) {
                    nextStepEl.classList.add('active');
                    if (progressFill) progressFill.style.width = (currentStep / totalSteps) * 100 + '%';
                    if (prevBtn) prevBtn.style.display = 'block';
                    if (currentStep === totalSteps) nextBtn.textContent = 'Finalizar Registro';
                    window.scrollTo(0, 0);
                }
            } else {
                await performFinalSave(nextBtn);
            }

        } catch (err) {
            console.error('Erro crítico no fluxo:', err);
            alert(`Erro no navegador: ${err.message}. Por favor, recarregue a página.`);
        }
    };

    if (prevBtn) {
        prevBtn.onclick = function () {
            if (currentStep > 1) {
                document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
                currentStep--;
                document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
                if (progressFill) progressFill.style.width = (currentStep / totalSteps) * 100 + '%';
                if (currentStep === 1) prevBtn.style.display = 'none';
                nextBtn.textContent = 'Avançar →';
                window.scrollTo(0, 0);
            }
        };
    }
}

async function performFinalSave(btn) {
    if (!supabase) {
        alert('Erro de conexão com o Supabase. Verifique sua rede.');
        return;
    }

    try {
        btn.disabled = true;
        btn.textContent = 'Gravando...';

        const payload = {
            username: document.getElementById('username')?.value,
            email: document.getElementById('email')?.value,
            full_name: document.getElementById('fullName')?.value,
            birth_date: document.getElementById('birthDate')?.value,
            city: document.getElementById('estado_pais')?.value,
            phone: document.getElementById('whatsapp')?.value || null,
            password_hash: btoa(document.getElementById('password')?.value || ''),
            status: 'pending'
        };

        const { error } = await supabase.from('profiles').insert([payload]);
        if (error) throw error;

        console.log('Dados salvos. Redirecionando...');
        window.location.href = 'activate.html';

    } catch (err) {
        console.error('Erro no Supabase:', err);
        alert(`Erro ao salvar no banco: ${err.message}`);
        btn.disabled = false;
        btn.textContent = 'Finalizar Registro';
    }
}

// Inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegistration);
} else {
    initRegistration();
}

// Upload de fotos
document.addEventListener('change', (e) => {
    if (e.target.id === 'fileInput') {
        const grid = document.getElementById('previewGrid');
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (uploadedFiles.length < 4) {
                uploadedFiles.push(file);
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const div = document.createElement('div');
                    div.className = 'preview-item';
                    div.innerHTML = `<img src="${ev.target.result}"><div class="preview-remove">×</div>`;
                    grid.appendChild(div);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
