document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LÓGICA DO MENU MOBILE E NAVBAR =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    if (navbar) {
        // Efeito de scroll na Navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // ===== ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA =====
    const animatedElements = document.querySelectorAll('.content-section, .process-step, .detail-card, .gallery-item, .nav-project');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }
    
    // ===== ANIMAÇÃO DE "DIGITAÇÃO" DO TÍTULO =====
    const serviceTitle = document.querySelector('.service-title');
    if (serviceTitle) {
        const originalText = serviceTitle.textContent;
        serviceTitle.textContent = '';

        const typeText = (element, text, speed = 80) => {
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        };
        
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(serviceTitle, originalText);
                    titleObserver.unobserve(entry.target);
                }
            });
        });
        titleObserver.observe(serviceTitle);
    }
    
    // ===== LÓGICA DA GALERIA LIGHTBOX =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');

    if (galleryItems.length > 0 && lightbox) {
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
            lightboxImage.style.opacity = 0;
            setTimeout(() => {
                lightboxImage.src = images[currentIndex].src;
                lightboxTitle.textContent = images[currentIndex].title;
                lightboxImage.style.opacity = 1;
            }, 200);
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
            if (e.target === lightbox) hideLightbox();
        });

        document.addEventListener('keydown', e => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') hideLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        });
    }
});

class ModernGallery {
    constructor() {
        this.currentFilter = 'all';
        this.currentView = 'grid-3';
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.currentLightboxIndex = 0;
        this.filteredItems = [];
        
        this.galleryData = [
            {
                id: 1,
                src: 'https://picsum.photos/400/300?random=1',
                title: 'Logo Principal',
                description: 'Desenvolvimento do logotipo principal da marca',
                category: 'logo',
                tags: ['Logo', 'Identidade']
            },
            {
                id: 2,
                src: 'https://picsum.photos/400/400?random=2',
                title: 'Variações do Logo',
                description: 'Diferentes versões e aplicações do logo',
                category: 'logo',
                tags: ['Logo', 'Variações']
            },
            {
                id: 3,
                src: 'https://picsum.photos/400/250?random=3',
                title: 'Cartão de Visita',
                description: 'Design do cartão de visita corporativo',
                category: 'papelaria',
                tags: ['Cartão', 'Papelaria']
            },
            {
                id: 4,
                src: 'https://picsum.photos/400/350?random=4',
                title: 'Papel Timbrado',
                description: 'Aplicação em papel timbrado oficial',
                category: 'papelaria',
                tags: ['Papel', 'Corporativo']
            },
            {
                id: 5,
                src: 'https://picsum.photos/400/280?random=5',
                title: 'Website Design',
                description: 'Interface do website da empresa',
                category: 'digital',
                tags: ['Web', 'UI/UX']
            },
            {
                id: 6,
                src: 'https://picsum.photos/400/320?random=6',
                title: 'App Mobile',
                description: 'Design do aplicativo mobile',
                category: 'digital',
                tags: ['Mobile', 'App']
            },
            {
                id: 7,
                src: 'https://picsum.photos/400/380?random=7',
                title: 'Mockup Corporativo',
                description: 'Apresentação em mockup realístico',
                category: 'mockup',
                tags: ['Mockup', 'Apresentação']
            },
            {
                id: 8,
                src: 'https://picsum.photos/400/260?random=8',
                title: 'Envelope Corporativo',
                description: 'Design do envelope oficial da empresa',
                category: 'papelaria',
                tags: ['Envelope', 'Papelaria']
            },
            {
                id: 9,
                src: 'https://picsum.photos/400/340?random=9',
                title: 'Social Media Kit',
                description: 'Templates para redes sociais',
                category: 'digital',
                tags: ['Social', 'Templates']
            },
            {
                id: 10,
                src: 'https://picsum.photos/400/300?random=10',
                title: 'Pasta Corporativa',
                description: 'Design da pasta institucional',
                category: 'papelaria',
                tags: ['Pasta', 'Institucional']
            },
            {
                id: 11,
                src: 'https://picsum.photos/400/280?random=11',
                title: 'Apresentação Mockup',
                description: 'Mockup de apresentação do projeto',
                category: 'mockup',
                tags: ['Mockup', 'Pitch']
            },
            {
                id: 12,
                src: 'https://picsum.photos/400/360?random=12',
                title: 'Manual de Marca',
                description: 'Páginas do manual de identidade visual',
                category: 'logo',
                tags: ['Manual', 'Guidelines']
            },
            {
                id: 13,
                src: 'https://picsum.photos/400/320?random=13',
                title: 'Sinalização Externa',
                description: 'Aplicação em placas e sinalização',
                category: 'mockup',
                tags: ['Sinalização', 'Externo']
            },
            {
                id: 14,
                src: 'https://picsum.photos/400/280?random=14',
                title: 'Crachá Corporativo',
                description: 'Design do crachá dos funcionários',
                category: 'papelaria',
                tags: ['Crachá', 'ID']
            },
            {
                id: 15,
                src: 'https://picsum.photos/400/350?random=15',
                title: 'Newsletter Design',
                description: 'Template para newsletter',
                category: 'digital',
                tags: ['Newsletter', 'Email']
            }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateFilteredItems();
        this.renderGallery();
    }

    showHideButton() {
        const container = document.querySelector('.load-more-container');
        if (!container) return;
        
        let hideBtn = document.getElementById('hideImagesBtn');
        
        if (!hideBtn) {
            hideBtn = document.createElement('button');
            hideBtn.id = 'hideImagesBtn';
            hideBtn.className = 'load-more-btn';
            hideBtn.innerHTML = `
                <span>Ocultar Imagens</span>
                <i class="fas fa-chevron-up"></i>
            `;
            hideBtn.addEventListener('click', () => this.hideImages());
            container.appendChild(hideBtn);
        }
        
        hideBtn.style.display = 'inline-flex';
    }

    hideHideButton() {
        const hideBtn = document.getElementById('hideImagesBtn');
        if (hideBtn) {
            hideBtn.style.display = 'none';
        }
    }

    hideImages() {
        this.currentPage = 1;
        this.renderGallery();
    }

    bindEvents() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.currentPage = 1;
                this.updateFilteredItems();
                this.renderGallery();
            });
        });

        // View buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentView = e.target.dataset.view;
                this.updateGalleryView();
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreItems();
            });
        }

        // Lightbox events
        this.bindLightboxEvents();
    }

    updateFilteredItems() {
        this.filteredItems = this.currentFilter === 'all' 
            ? this.galleryData 
            : this.galleryData.filter(item => item.category === this.currentFilter);
    }

    renderGallery() {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const visibleItems = this.filteredItems.slice(0, itemsToShow);

        grid.innerHTML = '';

        visibleItems.forEach((item, index) => {
            const galleryItem = this.createGalleryItem(item, index);
            grid.appendChild(galleryItem);
        });

        this.updateLoadMoreButton();
        this.bindGalleryItemEvents();
    }

    createGalleryItem(item, index) {
        const div = document.createElement('div');
        div.className = `gallery-item${this.currentView === 'masonry' ? ' masonry' : ''}`;
        div.dataset.category = item.category;
        div.dataset.index = index;

        div.innerHTML = `
            <img src="${item.src}" alt="${item.title}" class="gallery-image" loading="lazy">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <div class="gallery-tags">
                    ${item.tags.map(tag => `<span class="gallery-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        return div;
    }

    updateGalleryView() {
        const grid = document.getElementById('galleryGrid');
        if (grid) {
            grid.className = `gallery-grid ${this.currentView}`;
        }
    }

    loadMoreItems() {
        const loadBtn = document.getElementById('loadMoreBtn');
        if (!loadBtn) return;
        
        const spinner = document.createElement('span');
        spinner.className = 'loading-spinner';
        
        loadBtn.innerHTML = '';
        loadBtn.appendChild(spinner);
        loadBtn.disabled = true;

        setTimeout(() => {
            this.currentPage++;
            this.renderGallery();
            
            loadBtn.innerHTML = `
                <span>Carregar Mais</span>
                <i class="fas fa-chevron-down"></i>
            `;
            loadBtn.disabled = false;
        }, 1000);
    }

    updateLoadMoreButton() {
        const loadBtn = document.getElementById('loadMoreBtn');
        if (!loadBtn) return;
        
        const totalItems = this.filteredItems.length;
        const visibleItems = this.currentPage * this.itemsPerPage;

        if (visibleItems >= totalItems) {
            loadBtn.style.display = 'none';
            this.showHideButton();
        } else {
            loadBtn.style.display = 'inline-flex';
            this.hideHideButton();
        }
    }

    bindGalleryItemEvents() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.openLightbox(index);
            });
        });
    }

    bindLightboxEvents() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');

        if (!lightbox || !closeBtn || !prevBtn || !nextBtn) return;

        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.showPrevImage());
        nextBtn.addEventListener('click', () => this.showNextImage());

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPrevImage();
                    break;
                case 'ArrowRight':
                    this.showNextImage();
                    break;
            }
        });
    }

    openLightbox(index) {
        this.currentLightboxIndex = index;
        this.updateLightboxContent();
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showPrevImage() {
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const visibleItems = this.filteredItems.slice(0, itemsToShow);
        this.currentLightboxIndex = (this.currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
        this.updateLightboxContent();
    }

    showNextImage() {
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const visibleItems = this.filteredItems.slice(0, itemsToShow);
        this.currentLightboxIndex = (this.currentLightboxIndex + 1) % visibleItems.length;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const visibleItems = this.filteredItems.slice(0, itemsToShow);
        const item = visibleItems[this.currentLightboxIndex];

        if (!item) return;

        const image = document.getElementById('lightboxImage');
        const title = document.getElementById('lightboxTitle');
        const description = document.getElementById('lightboxDescription');

        if (!image || !title || !description) return;

        image.style.opacity = '0';
        
        setTimeout(() => {
            image.src = item.src;
            image.alt = item.title;
            title.textContent = item.title;
            description.textContent = item.description;
            image.style.opacity = '1';
        }, 150);
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernGallery();
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe gallery items when they're created
function observeGalleryItems() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
}

// Call observe function after gallery renders
setTimeout(observeGalleryItems, 100);