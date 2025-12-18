// Sistema de cadastro - Euro Luxe
console.log('Script carregado!');

// Initialize Supabase
const SUPABASE_URL = 'https://mfraaqpmenqwwkbwaodi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcmFhcXBtZW5xd3drYndhb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjczODYsImV4cCI6MjA0OTYwMzM4Nn0.g04gK88qCpKz5nnJdV4nMIuO49H00tKWPjfXIo7_lyw';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
    const uploadInstruction = document.getElementById('uploadInstruction');

    console.log('Botões encontrados:', { prevBtn, nextBtn, progressFill });

    // Botão Avançar
    nextBtn.onclick = function (e) {
        e.preventDefault();
        console.log('Botão Avançar clicado! Etapa atual:', currentStep);

        // Validação
        const currentStepEl = document.querySelector('.form-step.active');
        const inputs = currentStepEl.querySelectorAll('input[required], textarea[required]');

        let valid = true;
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    valid = false;
                    input.parentElement.style.borderColor = 'red';
                } else {
                    input.parentElement.style.borderColor = '';
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

        // Validação especial para etapa 1 (senhas)
        if (currentStep === 1) {
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('password_confirm').value;

            if (password.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                document.getElementById('password').style.borderColor = 'red';
                return;
            }

            if (password !== passwordConfirm) {
                alert('As senhas não coincidem. Por favor, verifique.');
                document.getElementById('password_confirm').style.borderColor = 'red';
                return;
            }
        }

        // Validação especial da etapa 4 (fotos) - opcional, até 4 fotos
        if (currentStep === 4 && uploadedFiles.length > 4) {
            alert('Máximo de 4 fotos permitidas.');
            valid = false;
        }

        if (!valid) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        if (currentStep < totalSteps) {
            currentStepEl.classList.remove('active');
            currentStep++;
            const nextStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            nextStepEl.classList.add('active');

            const progress = (currentStep / totalSteps) * 100;
            progressFill.style.width = progress + '%';

            if (currentStep > 1) {
                prevBtn.style.display = 'block';
            }

            if (currentStep === totalSteps) {
                nextBtn.textContent = 'Enviar perfil para análise';
            }

            console.log('Avançou para etapa:', currentStep);
        } else {
            // Formulário completo - salvar no Supabase
            saveProfile();
        }
    };

    // Função para salvar perfil no Supabase
    async function saveProfile() {
        try {
            nextBtn.disabled = true;
            nextBtn.textContent = 'Salvando...';

            // Coletar dados do formulário
            const username = document.getElementById('username').value;
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const birthDate = document.getElementById('birthDate').value;
            const phone = document.getElementById('phone')?.value || '';
            const instagram = document.getElementById('instagram')?.value || '';
            const city = document.getElementById('city')?.value || '';

            // Hash da senha (MUITO SIMPLES - apenas para demonstração)
            const passwordHash = btoa(password); // Base64 - NÃO É SEGURO EM PRODUÇÃO!

            // Upload das fotos
            let photoUrls = [];
            for (let i = 0; i < uploadedFiles.length; i++) {
                const file = uploadedFiles[i];
                const fileName = `${Date.now()}_${i}_${file.name}`;

                const { data, error } = await supabase.storage
                    .from('profile-photos')
                    .upload(fileName, file);

                if (error) {
                    console.error('Erro upload foto:', error);
                    continue;
                }

                const { data: urlData } = supabase.storage
                    .from('profile-photos')
                    .getPublicUrl(fileName);

                photoUrls.push(urlData.publicUrl);
            }

            // Salvar perfil no banco
            const { data, error } = await supabase
                .from('profiles')
                .insert([{
                    username,
                    email,
                    password_hash: passwordHash,
                    full_name: fullName,
                    birth_date: birthDate,
                    phone,
                    instagram,
                    city,
                    profile_photo_url: photoUrls[profilePhotoIndex] || photoUrls[0] || null,
                    status: 'pending'
                }])
                .select();

            if (error) {
                console.error('Erro ao salvar:', error);
                alert('Erro ao salvar cadastro: ' + error.message);
                nextBtn.disabled = false;
                nextBtn.textContent = 'Enviar perfil para análise';
                return;
            }

            console.log('Perfil salvo com sucesso:', data);
            // Redirecionar para página de ativação
            window.location.href = 'activate.html';

        } catch (error) {
            console.error('Erro geral:', error);
            alert('Erro ao processar cadastro. Tente novamente.');
            nextBtn.disabled = false;
            nextBtn.textContent = 'Enviar perfil para análise';
        }
    }

    // Botão Voltar
    prevBtn.onclick = function (e) {
        e.preventDefault();
        console.log('Botão Voltar clicado!');

        if (currentStep > 1) {
            const currentStepEl = document.querySelector('.form-step.active');
            currentStepEl.classList.remove('active');

            currentStep--;
            const prevStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            prevStepEl.classList.add('active');

            const progress = (currentStep / totalSteps) * 100;
            progressFill.style.width = progress + '%';

            if (currentStep === 1) {
                prevBtn.style.display = 'none';
            }

            nextBtn.textContent = 'Avançar →';

            console.log('Voltou para etapa:', currentStep);
        }
    };

    // Upload de Fotos
    uploadArea.onclick = function () {
        fileInput.click();
    };

    fileInput.onchange = function (e) {
        const files = Array.from(e.target.files);
        addFiles(files);
    };

    uploadArea.ondragover = function (e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--color-primary)';
    };

    uploadArea.ondragleave = function (e) {
        e.preventDefault();
        uploadArea.style.borderColor = '';
    };

    uploadArea.ondrop = function (e) {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        const files = Array.from(e.dataTransfer.files);
        addFiles(files);
    };

    function addFiles(files) {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        imageFiles.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} é muito grande. Máximo 5MB por foto.`);
                return;
            }

            if (uploadedFiles.length >= 4) {
                alert('Você já enviou 4 fotos. Remova uma para adicionar outra.');
                return;
            }

            uploadedFiles.push(file);
            createPreview(file, uploadedFiles.length - 1);
        });

        if (uploadedFiles.length > 0) {
            uploadInstruction.style.display = 'block';
        }

        console.log('Fotos carregadas:', uploadedFiles.length);
    }

    function createPreview(file, index) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.dataset.index = index;

            // Primeira foto é perfil por padrão
            if (index === 0) {
                previewItem.classList.add('profile-photo');
                const badge = document.createElement('div');
                badge.className = 'profile-badge';
                badge.textContent = 'PERFIL';
                previewItem.appendChild(badge);
            }

            const img = document.createElement('img');
            img.src = e.target.result;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'preview-remove';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = function (event) {
                event.stopPropagation();
                const photoIndex = parseInt(previewItem.dataset.index);
                uploadedFiles.splice(photoIndex, 1);

                // Recriar previews
                previewGrid.innerHTML = '';
                uploadedFiles.forEach((f, i) => createPreview(f, i));

                if (uploadedFiles.length === 0) {
                    uploadInstruction.style.display = 'none';
                }

                console.log('Foto removida. Total:', uploadedFiles.length);
            };

            // Click na foto para selecionar como perfil
            previewItem.onclick = function () {
                document.querySelectorAll('.preview-item').forEach(item => {
                    item.classList.remove('profile-photo');
                    const oldBadge = item.querySelector('.profile-badge');
                    if (oldBadge) oldBadge.remove();
                });

                previewItem.classList.add('profile-photo');
                const badge = document.createElement('div');
                badge.className = 'profile-badge';
                badge.textContent = 'PERFIL';
                previewItem.insertBefore(badge, previewItem.firstChild);

                profilePhotoIndex = parseInt(previewItem.dataset.index);
                console.log('Foto de perfil selecionada:', profilePhotoIndex);
            };

            previewItem.appendChild(img);
            previewItem.appendChild(removeBtn);
            previewGrid.appendChild(previewItem);
        };

        reader.readAsDataURL(file);
    }

    console.log('Event listeners configurados!');
});
