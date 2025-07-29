// Função utilitária para debounce
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Dados dos projetos
const projectsData = {
    project1: {
        title: "Projeto Branding Completo",
        description: "Desenvolvimento de identidade visual completa para uma startup de tecnologia inovadora...",
        client: "TechStart Solutions",
        category: "Branding • Identidade Visual",
        year: "2023",
        image: "1.png",
        tags: ["Branding", "Identidade Visual", "Startup", "Tecnologia"]
    },
    project2: {
        title: "Redesign de Marca",
        description: "Modernização completa da identidade visual de uma empresa estabelecida no mercado...",
        client: "Empresa Tradicional Ltda",
        category: "Branding • Redesign",
        year: "2023",
        image: "2.jpg",
        tags: ["Branding", "Redesign", "Modernização", "Logotipo"]
    },
    project3: {
        title: "Criação de Logotipo",
        description: "Desenvolvimento de logotipo minimalista e elegante para consultoria empresarial...",
        client: "Consultoria Pro Business",
        category: "Logotipo • Identidade Visual",
        year: "2023",
        image: "3.jpg",
        tags: ["Logotipo", "Minimalismo", "Consultoria", "Profissional"]
    },
    project4: {
        title: "Estratégia de Marca",
        description: "Desenvolvimento de estratégia de marca completa incluindo posicionamento, tom de voz...",
        client: "Premium Products Co.",
        category: "Branding • Estratégia",
        year: "2023",
        image: "4.jpg",
        tags: ["Estratégia", "Branding", "Packaging", "Premium"]
    },
    project5: {
        title: "Launch de Produto",
        description: "Criação de identidade visual específica para o lançamento de um produto inovador...",
        client: "Innovation Labs",
        category: "Branding • Lançamento",
        year: "2023",
        image: "https://placehold.co/600x400/000000/FFFFFF?text=Projeto+05",
        tags: ["Lançamento", "Produto", "Inovação", "Marketing"]
    },
    project6: {
        title: "Rebranding Premium",
        description: "Transformação completa de uma marca para posicionamento premium no mercado...",
        client: "Luxury Brand Inc.",
        category: "Rebranding • Premium",
        year: "2023",
        image: "https://placehold.co/600x400/000000/FFFFFF?text=Projeto+06",
        tags: ["Rebranding", "Premium", "Luxury", "Posicionamento"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const modal = document.getElementById('projectModal');

    // Menu Mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll da Navbar
    if (navbar) {
        window.addEventListener('scroll', debounce(() => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        }, 10));
    }

    // Filtro do Portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-main-item');

    if (filterButtons.length > 0) {
        const filterItems = (category) => {
            let visibleItemIndex = 0;

            portfolioItems.forEach(item => {
                const itemCategories = item.dataset.category.split(' ');
                const shouldShow = category === 'all' || itemCategories.includes(category);

                if (shouldShow) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                    item.style.transitionDelay = `${visibleItemIndex * 0.05}s`;
                    visibleItemIndex++;
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                    item.style.transitionDelay = '0s';
                }
            });
        };

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterItems(button.dataset.filter);
            });
        });
    }

    // Modal do Projeto
    if (modal) {
        const openModal = (projectId) => {
            const project = projectsData[projectId];
            if (!project) return;
            
            const elements = {
                modalImage: document.getElementById('modalImage'),
                modalTitle: document.getElementById('modalTitle'),
                modalDescription: document.getElementById('modalDescription'),
                modalClient: document.getElementById('modalClient'),
                modalCategory: document.getElementById('modalCategory'),
                modalYear: document.getElementById('modalYear'),
                modalTags: document.getElementById('modalTags')
            };

            // Atualizar conteúdo do modal
            elements.modalImage.src = project.image;
            elements.modalImage.alt = project.title;
            elements.modalTitle.textContent = project.title;
            elements.modalDescription.textContent = project.description;
            elements.modalClient.textContent = project.client;
            elements.modalCategory.textContent = project.category;
            elements.modalYear.textContent = project.year;
            
            elements.modalTags.innerHTML = project.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        const closeProjectModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        // Event listeners do modal
        document.querySelector('.close-modal')?.addEventListener('click', closeProjectModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') closeProjectModal();
        });

        // Tornar openModal acessível globalmente
        window.openModal = openModal;
    }

    // Lightbox da Galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');

    if (galleryItems.length > 0 && lightbox) {
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');
        const controls = {
            close: lightbox.querySelector('.lightbox-close'),
            prev: lightbox.querySelector('.lightbox-prev'),
            next: lightbox.querySelector('.lightbox-next')
        };

        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => ({
            src: item.href,
            title: item.dataset.title
        }));

        const showLightbox = (index) => {
            currentIndex = index;
            lightboxImage.src = images[currentIndex].src;
            lightboxTitle.textContent = images[currentIndex].title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const hideLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        const showNextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            showLightbox(currentIndex);
        };

        const showPrevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showLightbox(currentIndex);
        };

        // Event listeners do lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', e => {
                e.preventDefault();
                showLightbox(index);
            });
        });

        controls.close.addEventListener('click', hideLightbox);
        controls.next.addEventListener('click', showNextImage);
        controls.prev.addEventListener('click', showPrevImage);

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) hideLightbox();
        });

        document.addEventListener('keydown', e => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape': hideLightbox(); break;
                case 'ArrowRight': showNextImage(); break;
                case 'ArrowLeft': showPrevImage(); break;
            }
        });
    }

    // Animação de entrada com Intersection Observer
    if (portfolioItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        portfolioItems.forEach(item => observer.observe(item));
    }
});