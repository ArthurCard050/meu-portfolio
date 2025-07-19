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
    // Criado fora do overlay para evitar o desfoque
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
    z-index: 10000; /* Acima do overlay */
    filter: none; /* Evita ser desfocado */
`;

    
    // Aparecer overlay suavemente
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.backdropFilter = 'blur(20px)';
        overlay.style.pointerEvents = 'auto';
    }, 300);
    
    overlay.appendChild(loadingContainer); // Adiciona ao overlay
    
    // Fade in do loading
    setTimeout(() => {
        loadingContainer.style.opacity = '1';
    }, 100);
    
    // Redirecionar após animação
    setTimeout(() => {
        window.location.href = projectUrl;
        // O overflow hidden será resetado na nova página
    }, 2000);
    
}

// Adicionar evento de clique aos cards do portfólio
document.addEventListener('DOMContentLoaded', function() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // VERIFICAÇÃO ADICIONADA AQUI:
            // Se o card clicado estiver dentro de um link (<a>), não faz nada.
            // Isso permite que o link funcione normalmente.
            if (e.target.closest('a')) {
                return;
            }

            // O código abaixo só será executado se o card NÃO for um link.
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
        
        // Hover effect mais sutil (mantido do seu código original)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.01)';
            this.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.12)';
            this.style.filter = 'brightness(1.05)';
            this.classList.add('hover-active'); // Adiciona a classe para ativar o brilho
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'brightness(1)';
            this.classList.remove('hover-active'); // Remove a classe para desativar o brilho
            this.style.boxShadow = 'none'; // A sombra é removida completamente aqui
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
    background: conic-gradient(#00f0ff 0%, #0055ff 25%, #ffffff10 25%);
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

    @keyframes elegantSpin {
        0% { 
            transform: rotate(0deg);
            border-top-color: rgba(255, 255, 255, 0.8);
        }
        50% { 
            transform: rotate(180deg);
            border-top-color: rgba(255, 255, 255, 0.3);
        }
        100% { 
            transform: rotate(360deg);
            border-top-color: rgba(255, 255, 255, 0.8);
        }
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
    }
    
    /* Esta regra será controlada pelo JavaScript agora */
    /* .portfolio-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        opacity: 0;
        transition: opacity 0.4s ease;
        border-radius: 20px;
        pointer-events: none;
    } */
    
    /* Esta regra será controlada pelo JavaScript agora */
    /* .portfolio-card:hover::after {
        opacity: 1;
    } */
    
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
    
    /* Suavizar transições globais */
    * {
        transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    }
`;

document.head.appendChild(elegantStyles);