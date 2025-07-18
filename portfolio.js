document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores Globais ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-main-item');
    const modal = document.getElementById('projectModal');

    // --- Menu Mobile ---
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

    // --- Efeito de Scroll na Navbar (Otimizado) ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    // Debounce para otimizar performance
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };
    window.addEventListener('scroll', debounce(handleScroll, 10));


    // --- Funcionalidade do Filtro do Portfólio (CORRIGIDO) ---
    const filterItems = (category) => {
        let visibleItemIndex = 0; // Contador para a animação correta

        portfolioItems.forEach(item => {
            const itemCategories = item.dataset.category.split(' ');
            const shouldShow = category === 'all' || itemCategories.includes(category);

            if (shouldShow) {
                item.classList.remove('hide');
                item.classList.add('show');
                // Aplica o delay com base apenas nos itens visíveis
                item.style.transitionDelay = `${visibleItemIndex * 0.05}s`;
                visibleItemIndex++;
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
                item.style.transitionDelay = '0s'; // Reseta o delay
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.dataset.filter;
            filterItems(filterValue);
        });
    });

    // --- Funcionalidade do Modal ---
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

    const openModal = (projectId) => {
        if (!modal || !projectsData[projectId]) return;
        
        const project = projectsData[projectId];
        
        // Seletores do Modal
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalClient = document.getElementById('modalClient');
        const modalCategory = document.getElementById('modalCategory');
        const modalYear = document.getElementById('modalYear');
        const modalTags = document.getElementById('modalTags');

        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalClient.textContent = project.client;
        modalCategory.textContent = project.category;
        modalYear.textContent = project.year;
        
        modalTags.innerHTML = ''; // Limpar tags
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    document.querySelector('.close-modal')?.addEventListener('click', closeProjectModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeProjectModal();
    });

    // Tornar openModal acessível globalmente (para o onclick do HTML)
    window.openModal = openModal;


    // --- Animação de Entrada dos Itens ao Rolar a Página ---
    const animateItemsOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target); // Opcional: para animar apenas uma vez
                }
            });
        }, {
            threshold: 0.1
        });

        portfolioItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    // --- Inicialização ---
    animateItemsOnScroll();

});