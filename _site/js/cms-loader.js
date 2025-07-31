// Função utilitária para extrair frontmatter do markdown
function parseFrontMatter(markdown) {
    const fm = markdown.match(/---(.*?)---/s);
    const content = markdown.replace(fm[0], "").trim();
    const lines = fm[1].trim().split("\n");
    const data = {};
    
    for (const line of lines) {
        const [key, value] = line.split(":").map(x => x.trim());
        if (value.startsWith("[") || value.includes(",")) {
            data[key] = value.replace(/[\[\]"]/g, "").split(",").map(x => x.trim());
        } else {
            data[key] = value.replace(/^"|"$/g, "");
        }
    }
    data.body = content;
    return data;
}

// Função para atualizar SEO
function updateSEO(data) {
    const seoElements = {
        title: document.getElementById('seo-title'),
        description: document.getElementById('seo-description'),
        image: document.getElementById('seo-image')
    };

    if (seoElements.title) seoElements.title.textContent = data.seo_title || data.title;
    if (seoElements.description) seoElements.description.setAttribute('content', data.seo_description || data.description);
    if (seoElements.image) seoElements.image.setAttribute('content', data.seo_image || data.image);
}

// Função para carregar dados do hero
async function loadHeroData(base) {
    try {
        const heroRes = await fetch(`${base}/home/hero.md`);
        const heroText = await heroRes.text();
        const hero = parseFrontMatter(heroText);
        
        const nameLines = document.querySelectorAll('.name-line');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (nameLines[0]) nameLines[0].textContent = hero.nome;
        if (nameLines[1]) nameLines[1].textContent = hero.sobrenome;
        if (heroSubtitle) heroSubtitle.textContent = hero.subtitle;
        
        return hero;
    } catch (error) {
        console.error('Erro ao carregar dados do hero:', error);
    }
}

// Função para carregar dados sobre
async function loadAboutData(base) {
    try {
        const sobreRes = await fetch(`${base}/sobre.md`);
        const sobreText = await sobreRes.text();
        const sobre = parseFrontMatter(sobreText);
        
        const aboutElements = {
            title: document.querySelector('.about-title'),
            subtitle: document.querySelector('.about-subtitle'),
            description: document.querySelector('.about-main-container p')
        };

        if (aboutElements.title) aboutElements.title.textContent = sobre.title;
        if (aboutElements.subtitle) aboutElements.subtitle.textContent = sobre.subtitle;
        if (aboutElements.description) aboutElements.description.textContent = sobre.body;
        
        return sobre;
    } catch (error) {
        console.error('Erro ao carregar dados sobre:', error);
    }
}

// Função para carregar projetos
async function loadProjectsData(base) {
    const projectContainer = document.querySelector('.portfolio-main-grid');
    if (!projectContainer) return;

    try {
        const files = ['projeto-branding-01.md']; // Pode ser dinâmico
        
        for (let file of files) {
            const res = await fetch(`${base}/projetos/${file}`);
            const text = await res.text();
            const data = parseFrontMatter(text);

            const card = document.createElement('div');
            card.className = 'portfolio-main-item show';
            card.innerHTML = `
                <div class="portfolio-main-card">
                    <div class="card-main-image">
                        <img src="${data.image}" class="project-main-cover" alt="${data.title}">
                        <div class="card-main-overlay">
                            <div class="project-info">
                                <h3>${data.title}</h3>
                                <p>${data.description}</p>
                                <div class="project-tags">
                                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                            <div class="project-actions">
                                <a href="projeto1.html" class="view-btn">
                                    <i class="fas fa-eye"></i> Ver Projeto
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            projectContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
}

// Função principal para carregar todos os dados do CMS
async function loadCMSData() {
    const base = "/content";

    try {
        // Carregar dados em paralelo para melhor performance
        const [heroData, aboutData] = await Promise.all([
            loadHeroData(base),
            loadAboutData(base)
        ]);

        // Atualizar SEO com dados do hero (se disponível)
        if (heroData) {
            updateSEO(heroData);
        }

        // Carregar projetos por último (não crítico para SEO)
        await loadProjectsData(base);

    } catch (error) {
        console.error('Erro geral ao carregar dados do CMS:', error);
    }
}

// Inicializar carregamento
loadCMSData();

// Adicione esta linha para que o Rollup inclua este arquivo no bundle
export {};