// Dashboard - Euro Luxe
console.log('Dashboard loaded!');

// Mock data - 14 Sugar Daddies Europeus
const members = [
    {
        id: 1,
        name: "Alessandro Romano",
        location: "Milano, Itália",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.12 (1).jpeg",
        bio: "Ciao bella! Empresário do setor de moda em Milão. Adoro conversas profundas por vídeo enquanto tomo vinho. Procuro uma companhia online inteligente e sofisticada para chamadas exclusivas e troca de conteúdo premium. Valorizo intimidade virtual - vídeos personalizados, fotos sensuais e conversas sem pressa. Sou extremamente generoso com quem me faz companhia online regularmente.",
        interests: ["Vinhos", "Arte", "Viagens", "Gastronomia"],
        privatePhotos: 8
    },
    {
        id: 2,
        name: "Friedrich Schmidt",
        location: "München, Alemanha",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.12.jpeg",
        bio: "Olá! Engenheiro aeroespacial aposentado, agora investidor. Busco uma companhia online autêntica para videochamadas relaxantes e conversas íntimas. Adoro receber fotos e vídeos exclusivos. Valorizo honestidade e cumplicidade virtual. Pago bem por conteúdo personalizado e pela sua atenção dedicada. Conexão verdadeira, sem complicações.",
        interests: ["Esqui", "Música Clássica", "Investimentos", "Natureza"],
        privatePhotos: 12
    },
    {
        id: 3,
        name: "Philippe Dubois",
        location: "Paris, França",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.13 (1).jpeg",
        bio: "Bonjour ma chérie! Dono de boutiques de luxo em Paris. Procuro uma mulher elegante para chamadas de vídeo noturnas e conversas provocantes. Adoro receber conteúdo exclusivo - fotos íntimas, vídeos sensuais, áudios carinhosos. Sou muito generoso com quem me faz companhia virtual regularmente. Pago pela sua atenção, pelo seu tempo e pelo acesso ao seu mundo privado.",
        interests: ["Cinema", "Moda", "Cultura", "Gastronomia"],
        privatePhotos: 15
    },
    {
        id: 4,
        name: "James Wellington",
        location: "London, Inglaterra",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.13 (2).jpeg",
        bio: "Hello! Advogado corporativo em Londres. Busco conexão genuína online com alguém inteligente. Gosto de videochamadas estimulantes e conversas profundas. Pago bem por fotos exclusivas, vídeos personalizados e sua companhia virtual. Discreto, respeitoso e generoso. Valorizo qualidade - tanto nas conversas quanto no conteúdo que recebo.",
        interests: ["Literatura", "Whisky", "História", "Teatro"],
        privatePhotos: 6
    },
    {
        id: 5,
        name: "Carlos Fernández",
        location: "Barcelona, Espanha",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.13.jpeg",
        bio: "¡Hola guapa! Empresário do setor imobiliário. Procuro diversão e bons momentos online com alguém especial. Gosto de videochamadas animadas, conversas ousadas e receber conteúdo exclusivo. Pago muito bem por fotos sensuais, vídeos personalizados e sua atenção. Sou direto, generoso e adoro criar memórias virtuais intensas.",
        interests: ["Festas", "Praia", "Iates", "Vida Noturna"],
        privatePhotos: 20
    },
    {
        id: 6,
        name: "Henrik Larsson",
        location: "Stockholm, Suécia",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.14 (1).jpeg",
        bio: "Hej! CEO de startup de tecnologia. Valorizo honestidade e conexão real, mesmo que virtual. Busco alguém autêntica para videochamadas sem máscaras. Pago por conversas profundas, conteúdo exclusivo e sua companhia online. Se você valoriza simplicidade, autenticidade e compensação justa pelo seu tempo, podemos nos dar muito bem.",
        interests: ["Tecnologia", "Design", "Sauna", "Caminhadas"],
        privatePhotos: 5
    },
    {
        id: 7,
        name: "Dimitri Volkov",
        location: "Monaco, Mônaco",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.14 (2).jpeg",
        bio: "Privyet! Investidor internacional baseado em Monaco. Procuro uma mulher sofisticada para videochamadas VIP e conteúdo premium exclusivo. Sou MUITO generoso com quem me faz sentir especial online. Pago valores altos por fotos profissionais, vídeos sensuais e sua atenção dedicada. Se você busca luxo virtual e um homem que paga bem, vamos conversar.",
        interests: ["Cassinos", "Carros", "Iates", "Luxo"],
        privatePhotos: 18
    },
    {
        id: 8,
        name: "Antonio Silva",
        location: "Lisboa, Portugal",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.14 (3).jpeg",
        bio: "Olá linda! Dono de vinícolas em Portugal. Romântico e atencioso. Busco alguém carinhosa para videochamadas à luz de velas e conversas íntimas. Adoro receber fotos românticas, vídeos exclusivos e mensagens carinhosas. Valorizo companhia virtual dedicada e pago generosamente por conteúdo personalizado e sua atenção.",
        interests: ["Vinhos", "Fado", "Dança", "Culinária"],
        privatePhotos: 10
    },
    {
        id: 9,
        name: "Klaus Müller",
        location: "Zürich, Suíça",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.14 (4).jpeg",
        bio: "Grüezi! Banqueiro suíço. Extremamente discreto e generoso. Procuro uma mulher confiável para videochamadas privadas e troca de conteúdo exclusivo. Pago valores premium por fotos profissionais, vídeos sensuais e conversas íntimas. Sem exposição, apenas cumplicidade virtual e compensação financeira justa. Qualidade sobre quantidade.",
        interests: ["Relógios", "Montanhismo", "Privacidade", "Finanças"],
        privatePhotos: 7
    },
    {
        id: 10,
        name: "Jean-Pierre Moreau",
        location: "Lyon, França",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.14.jpeg",
        bio: "Salut! Chef de cozinha renomado. Apaixonado por experiências sensoriais. Busco alguém que aprecie conversas intensas por vídeo e troca de conteúdo sensual. Adoro videochamadas íntimas, receber fotos provocantes e vídeos personalizados. Sou criativo, carinhoso e muito generoso financeiramente. Posso te surpreender com o que pago.",
        interests: ["Gastronomia", "Vinhos", "Viagens", "Culinária"],
        privatePhotos: 14
    },
    {
        id: 11,
        name: "Marco Rossi",
        location: "Roma, Itália",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.15 (1).jpeg",
        bio: "Ciao bella! Arquiteto italiano. Procuro uma musa virtual que aprecie conversas profundas por vídeo e arte sensual. Pago muito bem por fotos artísticas, vídeos exclusivos e sessões de videochamada íntimas. Sou romântico mas com mente aberta. Valorizo estética, criatividade e compenso generosamente pelo seu tempo e conteúdo.",
        interests: ["Arquitetura", "Arte", "Ópera", "Design"],
        privatePhotos: 11
    },
    {
        id: 12,
        name: "Thomas Becker",
        location: "Hamburg, Alemanha",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.15 (2).jpeg",
        bio: "Moin! Dono de companhia marítima. Busco companhia online aventureira para videochamadas do meu iate. Gosto de mulheres descomplicadas que enviem conteúdo exclusivo - fotos do dia a dia, vídeos sensuais, conversas sem filtro. Pago extremamente bem por sua atenção virtual e conteúdo personalizado. Liberdade e generosidade.",
        interests: ["Iates", "Navegação", "Viagens", "Mar"],
        privatePhotos: 22
    },
    {
        id: 13,
        name: "Rafael García",
        location: "Madrid, Espanha",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.15 (3).jpeg",
        bio: "¡Hola preciosa! Jogador profissional de pôquer aposentado. Busco alguém que curta adrenalina virtual. Adoro videochamadas divertidas, conversas ousadas e receber conteúdo exclusivo. Pago MUITO bem por fotos sensuais, vídeos personalizados e sua companhia online. Generoso, divertido e direto. Vamos jogar esse jogo juntos?",
        interests: ["Pôquer", "Festas", "Esportes", "Adrenalina"],
        privatePhotos: 16
    },
    {
        id: 14,
        name: "Sebastian van Berg",
        location: "Amsterdam, Holanda",
        photo: "PROFILE PICTURES/WhatsApp Image 2025-12-18 at 17.44.15.jpeg",
        bio: "Hallo! Galerista de arte contemporânea. Valorizo conversas inteligentes por vídeo e conexões profundas online. Procuro alguém de mente aberta para videochamadas filosóficas e troca de conteúdo artístico-sensual. Pago bem por fotos criativas, vídeos exclusivos e sua companhia virtual. Respeitoso, apaixonado e generoso.",
        interests: ["Arte Moderna", "Museus", "Filosofia", "Cultura"],
        privatePhotos: 9
    }
];

// DOM Elements
const membersGrid = document.getElementById('membersGrid');
const profileModal = document.getElementById('profileModal');
const userName = document.getElementById('userName');
const onlineCount = document.getElementById('onlineCount');

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    loadMembers();
    loadUserData();
    updateOnlineCount();
    scheduleNotifications();
});

// Mock offers - 4 different proposals
const mockOffers = [
    { amount: 30, from: "Alessandro Romano", for: "uma conversa privada" },
    { amount: 50, from: "Friedrich Schmidt", for: "chamada de vídeo exclusiva" },
    { amount: 70, from: "Philippe Dubois", for: "encontro virtual VIP" },
    { amount: 45, from: "Henrik Larsson", for: "sessão de chat premium" }
];

let offersShown = 0;

// Schedule multiple notifications to appear sporadically
function scheduleNotifications() {
    // First notification: 7 seconds
    let totalDelay = 7000;

    setTimeout(() => {
        showNotification();
        scheduleNextNotification();
    }, totalDelay);
}

function scheduleNextNotification() {
    // Only show up to 4 notifications total
    if (offersShown >= mockOffers.length) {
        return;
    }

    // Next notification: 8-15 seconds after the previous
    const randomDelay = Math.floor(Math.random() * 7000) + 8000;

    setTimeout(() => {
        showNotification();
        scheduleNextNotification();
    }, randomDelay);
}

function showNotification() {
    if (offersShown >= mockOffers.length) {
        return;
    }

    const offer = mockOffers[offersShown];
    offersShown++;

    // Update notification content
    document.getElementById('offerAmount').textContent = `€${offer.amount},00`;
    document.getElementById('offerFrom').textContent = offer.from;
    document.getElementById('offerFor').textContent = offer.for;

    const popup = document.getElementById('notificationPopup');
    popup.style.display = 'block';
}

function closeNotification() {
    const popup = document.getElementById('notificationPopup');
    popup.style.display = 'none';
}

function goToActivation() {
    window.location.href = 'activate.html';
}

function loadUserData() {
    // Simular dados do usuário logado
    const username = localStorage.getItem('username') || '@NovaMembro';
    userName.textContent = username;
}

function updateOnlineCount() {
    onlineCount.textContent = `${members.length} membros ativos agora`;
}

function loadMembers() {
    membersGrid.innerHTML = '';

    members.forEach(member => {
        const card = createMemberCard(member);
        membersGrid.appendChild(card);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.onclick = () => openProfile(member);

    card.innerHTML = `
        <div style="position: relative;">
            <img src="${member.photo}" alt="${member.name}" class="member-photo">
            <div class="private-photos-badge">${member.privatePhotos} fotos privadas</div>
        </div>
        <div class="member-info">
            <div class="member-header">
                <h3 class="member-name">${member.name}</h3>
                <div class="online-indicator"></div>
            </div>
            <p class="member-details">${member.location}</p>
            <p class="member-bio">${member.bio}</p>
        </div>
    `;

    return card;
}

function openProfile(member) {
    // Preencher modal
    document.getElementById('modalPhoto').src = member.photo;
    document.getElementById('modalPhoto').alt = member.name;
    document.getElementById('modalName').textContent = member.name;
    document.getElementById('modalDetails').textContent = member.location;
    document.getElementById('modalBio').textContent = member.bio;

    // Interesses
    const interestsContainer = document.getElementById('modalInterests');
    interestsContainer.innerHTML = '';
    member.interests.forEach(interest => {
        const tag = document.createElement('span');
        tag.className = 'interest-tag';
        tag.textContent = interest;
        interestsContainer.appendChild(tag);
    });

    // Mostrar modal
    profileModal.classList.add('active');
}

function closeModal() {
    profileModal.classList.remove('active');
}

// Fechar modal ao pressionar ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
