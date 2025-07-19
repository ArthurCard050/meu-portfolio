// Função para criar overlay de transição suave
function createSmoothTransition() {
    const overlay = document.createElement('div');
    overlay.className = 'smooth-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9), 
            rgba(17, 17, 17, 0.95), 
            rgba(0, 0, 0, 0.9)
        );
        z-index: 9999;
        opacity: 0;
        backdrop-filter: blur(0px);
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(overlay);
    return overlay;
}

// Função para animar elementos da página
function animatePageElements() {
    const elements = document.querySelectorAll('.portfolio-card, .hero-title, .nav-menu, .contact-form');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            element.style.transform = 'translateY(20px) scale(0.95)';
            element.style.opacity = '0.3';
            element.style.filter = 'blur(3px)';
        }, index * 100);
    });
}

// Função para criar partículas flutuantes
function createFloatingParticles(container) {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
}

// CONFIGURAÇÕES DE TEMPO DA ANIMAÇÃO
const TRANSITION_CONFIG = {
    overlayAppearDelay: 300,    // Tempo para o overlay aparecer (ms)
    loadingFadeDelay: 400,      // Tempo para o loading aparecer (ms)
    totalAnimationTime: 1500    // TEMPO TOTAL da animação antes do redirecionamento (ms)
};

// Função principal de transição
function smoothPageTransition(clickedCard, projectUrl) {
    const overlay = createSmoothTransition();
    
    // Bloqueia o scroll da página
    document.body.style.overflow = 'hidden';
    
    // Animar elementos da página
    animatePageElements();
    
    // Criar partículas flutuantes
    createFloatingParticles(overlay);

    // Adicionar indicador de carregamento elegante
    const loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;
        opacity: 0;
        transition: all 0.6s ease-out;
        z-index: 10001;
        filter: none;
    `;

    // Criar loader elegante
    const loader = document.createElement('div');
    loader.className = 'elegant-loader';
    
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Carregando projeto...';
    loadingText.style.cssText = `
        margin-top: 20px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 1px;
        opacity: 0.8;
    `;
    
    loadingContainer.appendChild(loader);
    loadingContainer.appendChild(loadingText);
    document.body.appendChild(loadingContainer);
    
    // Aparecer overlay suavemente
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.backdropFilter = 'blur(20px)';
        overlay.style.pointerEvents = 'auto';
    }, TRANSITION_CONFIG.overlayAppearDelay);
    
    // Fade in do loading
    setTimeout(() => {
        loadingContainer.style.opacity = '1';
    }, TRANSITION_CONFIG.loadingFadeDelay);
    
    // Redirecionar após animação
    setTimeout(() => {
        window.location.href = projectUrl;
    }, TRANSITION_CONFIG.totalAnimationTime);
}

// Adicionar evento de clique aos cards do portfólio
document.addEventListener('DOMContentLoaded', function() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // URLs das páginas dos projetos
            const projectUrls = [
                'projeto1.html', // Projeto Branding 01
                'projeto2.html', // Projeto Branding 02
                'projeto3.html', // Projeto Branding 03
                'projeto4.html', // Projeto Branding 04
                'projeto5.html', // Projeto Branding 05
                'projeto6.html'  // Projeto Branding 06
            ];
            
            // Efeito suave de clique
            this.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
            this.style.transform = 'translateY(-5px) scale(0.98)';
            this.style.filter = 'brightness(1.1)';
            
            setTimeout(() => {
                smoothPageTransition(this, projectUrls[index]);
            }, 200);
        });
        
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.01)';
            this.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.12)';
            this.style.filter = 'brightness(1.05)';
            this.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'brightness(1)';
            this.classList.remove('hover-active');
            this.style.boxShadow = 'none';
        });
    });

    // Menu mobile toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll para links internos
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// CSS adicional para loader elegante e animações suaves
const elegantStyles = document.createElement('style');
elegantStyles.textContent = `
    .elegant-loader {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: conic-gradient(#00f0ff 0%, #0055ff 25%, rgba(255,255,255,0.1) 25%);
        animation: rotateProgress 1.5s linear infinite;
        position: relative;
        margin: 0 auto;
    }

    .elegant-loader::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        width: 50px;
        height: 50px;
        background: #111;
        border-radius: 50%;
        z-index: 1;
    }

    @keyframes rotateProgress {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes particleFloat {
        0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% { 
            transform: translateY(-15px) translateX(8px);
            opacity: 0.8;
        }
    }
    
    .portfolio-card {
        cursor: pointer;
        will-change: transform, filter, box-shadow;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        position: relative;
        overflow: hidden;
    }
    
    .card-overlay {
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    .portfolio-card:hover .card-overlay {
        transform: translateY(0);
        backdrop-filter: blur(15px);
    }
    
    .smooth-transition-overlay {
        will-change: opacity, backdrop-filter;
    }

    /* Menu mobile styles */
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
        padding: 4px;
    }

    .hamburger span {
        width: 25px;
        height: 3px;
        background: #fff;
        margin: 3px 0;
        transition: 0.3s;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }

        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(17, 17, 17, 0.95);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            backdrop-filter: blur(10px);
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu li {
            margin: 15px 0;
        }
    }
    
    /* Suavizar transições globais */
    * {
        transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    }
`;

document.head.appendChild(elegantStyles);