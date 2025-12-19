// Sistema de cadastro - Euro Luxe
console.log('Script carregado!');

// Configurações do Supabase
const SUPABASE_URL = 'https://mfraaqpmenqwwkbwaodi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcmFhcXBtZW5xd3drYndhb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjczODYsImV4cCI6MjA0OTYwMzM4Nn0.g04gK88qCpKz5nnJdV4nMIuO49H00tKWPjfXIo7_lyw';

let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (e) {
    console.error('Falha ao inicializar Supabase:', e);
}

let currentStep = 1;
const totalSteps = 5;
let uploadedFiles = [];
let profilePhotoIndex = 0;

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM carregado!');

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewGrid = document.getElementById('previewGrid');

    // Navegação e Validação
    nextBtn.onclick = async function (e) {
        e.preventDefault();

        const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (!currentStepEl) return;

        // Seleciona campos obrigatórios (inputs e textareas)
        const inputs = currentStepEl.querySelectorAll('input[required], textarea[required]');
        let valid = true;

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    valid = false;
                    input.parentElement.style.border = '1px solid red';
                } else {
                    input.parentElement.style.border = '';
                }
            } else {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            }
        });

        // Verificação específica de senha na Etapa 1
        if (currentStep === 1) {
            const pwd = document.getElementById('password');
            const pwdConf = document.getElementById('password_confirm');
            if (pwd && pwdConf) {
                if (pwd.value.length < 6) {
                    alert('A senha deve ter no mínimo 6 caracteres');
                    return;
                }
                if (pwd.value !== pwdConf.value) {
                    alert('As senhas não coincidem');
                    return;
                }
            }
        }

        if (!valid) {
            alert('Por favor, preencha todos os campos obrigatórios (*) para continuar.');
            return;
        }

        // Avançar ou Salvar
        if (currentStep < totalSteps) {
            currentStepEl.classList.remove('active');
            currentStep++;
            const nextStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            nextStepEl.classList.add('active');

            progressFill.style.width = (currentStep / totalSteps) * 100 + '%';
            prevBtn.style.display = 'block';

            if (currentStep === totalSteps) {
                nextBtn.textContent = 'Finalizar Registro';
            }
        } else {
            await saveToSupabase();
        }
    };

    prevBtn.onclick = function () {
        if (currentStep > 1) {
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
            currentStep--;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            progressFill.style.width = (currentStep / totalSteps) * 100 + '%';
            if (currentStep === 1) prevBtn.style.display = 'none';
            nextBtn.textContent = 'Avançar →';
        }
    };

    async function saveToSupabase() {
        if (!supabase) {
            alert('Erro de conexão com o servidor. Tente recarregar a página.');
            return;
        }

        try {
            nextBtn.disabled = true;
            nextBtn.textContent = 'Enviando...';

            // Mapeamento dos campos conforme sua tabela 'profiles'
            const profileData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                full_name: document.getElementById('fullName').value,
                birth_date: document.getElementById('birthDate').value,
                // Mapeando IDs do HTML para colunas do Banco
                city: document.getElementById('estado_pais').value,
                phone: document.getElementById('whatsapp').value || null,
                password_hash: btoa(document.getElementById('password').value), // Simples para teste
                status: 'pending'
            };

            // Upload de fotos se existirem
            let photoUrl = null;
            if (uploadedFiles.length > 0) {
                const file = uploadedFiles[profilePhotoIndex] || uploadedFiles[0];
                const fileName = `profile_${Date.now()}_${profileData.username}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('profile-photos')
                    .upload(fileName, file);

                if (!uploadError) {
                    const { data: publicURL } = supabase.storage.from('profile-photos').getPublicUrl(fileName);
                    photoUrl = publicURL.publicUrl;
                }
            }

            profileData.profile_photo_url = photoUrl;

            // Inserção no Banco
            const { error: dbError } = await supabase
                .from('profiles')
                .insert([profileData]);

            if (dbError) throw dbError;

            // Sucesso
            window.location.href = 'activate.html';

        } catch (err) {
            console.error('Erro no salvamento:', err);
            alert('Erro ao salvar no banco: ' + (err.message || 'Verifique sua conexão'));
            nextBtn.disabled = false;
            nextBtn.textContent = 'Finalizar Registro';
        }
    }

    // Lógica de Upload (Simplificada para estabilidade)
    uploadArea.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (uploadedFiles.length < 4) {
                uploadedFiles.push(file);
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const div = document.createElement('div');
                    div.className = 'preview-item';
                    div.innerHTML = `<img src="${ev.target.result}"><div class="preview-remove">×</div>`;
                    previewGrid.appendChild(div);
                };
                reader.readAsDataURL(file);
            }
        });
    };
});
