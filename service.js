
// Service Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.content-section, .process-step, .detail-card, .gallery-item, .nav-project');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== GALLERY MODAL =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;
    
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img class="modal-image" src="" alt="">
                <div class="modal-info">
                    <h3 class="modal-title"></h3>
                    <div class="modal-nav">
                        <button class="modal-prev">←</button>
                        <span class="modal-counter">1 / 4</span>
                        <button class="modal-next">→</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    body.appendChild(modal);
    
    const modalImg = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalCounter = modal.querySelector('.modal-counter');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('.gallery-image').src,
        title: item.querySelector('.gallery-overlay h4').textContent
    }));
    
    // Open modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showModal();
        });
    });
    
    function showModal() {
        modal.classList.add('active');
        body.classList.add('modal-open');
        updateModalContent();
    }
    
    function hideModal() {
        modal.classList.remove('active');
        body.classList.remove('modal-open');
    }
    
    function updateModalContent() {
        if (images[currentImageIndex]) {
            modalImg.src = images[currentImageIndex].src;
            modalTitle.textContent = images[currentImageIndex].title;
            modalCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        }
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModalContent();
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModalContent();
    }
    
    // Modal event listeners
    modalClose.addEventListener('click', hideModal);
    modalNext.addEventListener('click', nextImage);
    modalPrev.addEventListener('click', prevImage);
    
    // Close modal when clicking backdrop
    modal.querySelector('.modal-backdrop').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            hideModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    hideModal();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    

    // ===== TYPING ANIMATION =====
    const typeText = (element, text, speed = 50) => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    };
    
    // Apply typing animation to service title
    const serviceTitle = document.querySelector('.service-title');
    if (serviceTitle) {
        const originalText = serviceTitle.textContent;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(serviceTitle, originalText, 100);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(serviceTitle);
    }
    
    // ===== COUNTER ANIMATION =====
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    };
    
    // ===== PROGRESS BARS =====
    const createProgressBar = (container, percentage, label) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-label">${label}</div>
            <div class="progress-track">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="progress-percentage">0%</div>
        `;
        
        container.appendChild(progressBar);
        
        const fill = progressBar.querySelector('.progress-fill');
        const percentageEl = progressBar.querySelector('.progress-percentage');
        
        setTimeout(() => {
            fill.style.width = percentage + '%';
            animateCounter(percentageEl, percentage);
        }, 300);
    };
    
    // ===== LAZY LOADING =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== BREADCRUMB FUNCTIONALITY =====
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        const links = breadcrumb.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.location.href = href;
                }
            });
        });
    }
    
    // ===== COPY TO CLIPBOARD =====
    const addCopyButton = (element) => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copiar';
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(element.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        element.style.position = 'relative';
        element.appendChild(button);
    };
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Throttle scroll events
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };
    
    // Debounce resize events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        // Recalculate any dynamic elements
        const gallery = document.querySelector('.gallery-grid');
        if (gallery) {
            gallery.style.height = 'auto';
        }
    }, 250));
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.classList.add('focused');
        });
        
        el.addEventListener('blur', () => {
            el.classList.remove('focused');
        });
    });
    
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ===== LOADING ANIMATION =====
    const showLoading = () => {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    };
    
    // ===== INITIALIZE =====
    console.log('Service page JavaScript loaded successfully!');
    
    // Add any initialization code here
    if (window.innerWidth > 768) {
        // Desktop-specific initializations
    } else {
        // Mobile-specific initializations
    }
});



// ===== ADDITIONAL CSS FOR JAVASCRIPT FEATURES =====
const additionalStyles = `
<style>
/* Gallery Modal */
.gallery-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
}

.gallery-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-backdrop {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-image {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10001;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
}

.modal-info {
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.8);
}

.modal-title {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.modal-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-prev,
.modal-next {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-prev:hover,
.modal-next:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
}

.modal-counter {
    color: #ccc;
    font-size: 0.9rem;
}

/* Navbar Scroll Effects */
.navbar.scrolled {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.navbar.hidden {
    transform: translateY(-100%);
}

/* Progress Bars */
.progress-bar {
    margin-bottom: 1.5rem;
}

.progress-label {
    color: #fff;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.progress-track {
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #fff, #666);
    transition: width 2s ease;
}

.progress-percentage {
    color: #ccc;
    font-size: 0.8rem;
    text-align: right;
    margin-top: 0.25rem;
}

/* Copy Button */
.copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.copy-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

*:hover .copy-btn {
    opacity: 1;
}

/* Skip Link */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
    border-radius: 4px;
}

.skip-link:focus {
    top: 6px;
}

/* Focus Indicators */
.focused {
    outline: 2px solid #fff;
    outline-offset: 2px;
}

/* Page Loader */
.page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
}

.page-loader.fade-out {
    opacity: 0;
}

.loader-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Animation Classes */
.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Mobile Styles */
@media (max-width: 768px) {
    .modal-content {
        max-width: 95vw;
        max-height: 95vh;
    }
    
    .modal-info {
        padding: 1rem;
    }
    
    .modal-nav {
        flex-direction: column;
        gap: 1rem;
    }
}

body.modal-open,
body.menu-open {
    overflow: hidden;
}
</style>
`;

// ===================================
// LÓGICA DA GALERIA LIGHTBOX
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return; // Só continua se houver uma galeria na página

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return; // Para o script se o HTML do lightbox não existir

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.href,
        title: item.dataset.title
    }));

    function updateLightbox() {
        lightboxImage.src = images[currentIndex].src;
        lightboxTitle.textContent = images[currentIndex].title;
    }

    function showLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', e => {
            e.preventDefault();
            showLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', hideLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

    document.addEventListener('keydown', e => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') hideLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });
});

// Insert additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);


