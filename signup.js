// Sistema de cadastro - Euro Luxe
console.log('Script carregado!');

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
            alert('Formulário enviado! Profile Photo Index: ' + profilePhotoIndex);
        }
    };

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
