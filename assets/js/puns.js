const puns = [
    {
        setup: "Por que o Brasil não joga xadrez?",
        punchline: "Porque a Rainha é louca e o Rei fugiu para Portugal! 👑"
    },
    {
        setup: "O que a Revolução Francesa disse para Luís XVI?",
        punchline: "Acho que você perdeu a cabeça! 🇫🇷"
    },
    {
        setup: "Por que não havia internet na Idade Média?",
        punchline: "Porque havia muitos cavaleiros de Troia! 🛡️"
    },
    {
        setup: "Qual era o problema do Faraó?",
        punchline: "Ele tinha complexo de Múmia! 🤕"
    },
    {
        setup: "O que o comunismo disse para o capitalismo?",
        punchline: "Vamos dividir a conta? 💸"
    },
    {
        setup: "Por que Napoleão não usava o WhatsApp?",
        punchline: "Porque ele tinha medo de ser bloqueado em Waterloo! 📱"
    },
    {
        setup: "O que D. Pedro I disse ao tirar 10 na prova?",
        punchline: "Independência ou Sorte! 🍀"
    },
    {
        setup: "Qual o animal favorito da História?",
        punchline: "O 'passado'! 🐦"
    },
    {
        setup: "Por que os Espartanos não assistiam filmes?",
        punchline: "Porque o filme era '300' e a sala só cabia 200! ⚔️"
    },
    {
        setup: "O que Getúlio Vargas disse quando saiu do grupo do Zap?",
        punchline: "Saio da vida para entrar na História! 📝"
    }
];

let currentPunIndex = -1;
const cardContainer = document.getElementById('pun-card-container');
const nextBtn = document.getElementById('next-pun-btn');

function getRandomPun() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * puns.length);
    } while (newIndex === currentPunIndex && puns.length > 1);
    
    currentPunIndex = newIndex;
    return puns[currentPunIndex];
}

function createCard(pun) {
    const card = document.createElement('div');
    card.className = 'pun-display-card';
    
    card.innerHTML = `
        <div class="pun-inner">
            <div class="pun-front">
                <div class="pun-icon">🤔</div>
                <p class="pun-text">${pun.setup}</p>
                <span class="tap-hint">Toque para ver a resposta</span>
            </div>
            <div class="pun-back">
                <div class="pun-icon">😂</div>
                <p class="pun-text">${pun.punchline}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            triggerConfetti(card);
        }
    });

    return card;
}

function showNextPun() {
    // Disable button temporarily
    nextBtn.disabled = true;
    
    const oldCard = cardContainer.querySelector('.pun-display-card');
    const newPun = getRandomPun();
    const newCard = createCard(newPun);

    // Prepare new card (start off-screen right)
    newCard.classList.add('entering');
    cardContainer.appendChild(newCard);

    // Animate old card out (to left)
    if (oldCard) {
        oldCard.classList.add('exiting');
        setTimeout(() => {
            oldCard.remove();
        }, 500); // Match CSS transition
    }

    // Animate new card in
    requestAnimationFrame(() => {
        newCard.classList.remove('entering');
    });

    setTimeout(() => {
        nextBtn.disabled = false;
    }, 500);
}

function triggerConfetti(element) {
    // Simple emoji burst effect
    const rect = element.getBoundingClientRect();
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    for (let i = 0; i < 10; i++) {
        createEmojiParticle(center.x, center.y);
    }
}

function createEmojiParticle(x, y) {
    const emojis = ['😂', '🤣', '😹', '💀', '✨'];
    const particle = document.createElement('div');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.className = 'emoji-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showNextPun();
    nextBtn.addEventListener('click', showNextPun);
});
