import { smoothPageTransition } from './animations.js';

// Eventos e comportamentos da página principal
document.addEventListener('DOMContentLoaded', () => {
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  const projectUrls = [
    'projeto1.html',
    'projeto2.html',
    'projeto3.html',
    'projeto4.html',
    'projeto5.html',
    'projeto6.html'
  ];

  portfolioCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      card.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform = 'translateY(-5px) scale(0.98)';
      card.style.filter = 'brightness(1.1)';
      setTimeout(() => smoothPageTransition(projectUrls[index]), 200);
    });

card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.01)';
      card.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.12)';
      card.style.filter = 'brightness(1.05)';
      card.classList.add('hover-active');

    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.filter = 'brightness(1)';
      card.classList.remove('hover-active');
      card.style.boxShadow = 'none';
    });

    });

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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