document.getElementById('seo-title').textContent = data.seo_title || data.title;
document.getElementById('seo-description').setAttribute('content', data.seo_description || data.description);
document.getElementById('seo-image').setAttribute('content', data.seo_image || data.image);

async function loadCMSData() {
  const base = "/content";

  // Carrega dados da Home
  const heroRes = await fetch(`${base}/home/hero.md`);
  const heroText = await heroRes.text();
  const hero = parseFrontMatter(heroText);
  document.querySelector('.name-line:nth-child(1)').textContent = hero.nome;
  document.querySelector('.name-line:nth-child(2)').textContent = hero.sobrenome;
  document.querySelector('.hero-subtitle').textContent = hero.subtitle;

  // Sobre Mim
  const sobreRes = await fetch(`${base}/sobre.md`);
  const sobreText = await sobreRes.text();
  const sobre = parseFrontMatter(sobreText);
  document.querySelector('.about-title').textContent = sobre.title;
  document.querySelector('.about-subtitle').textContent = sobre.subtitle;
  document.querySelector('.about-main-container p').textContent = sobre.body;

  // Projetos
  const projectContainer = document.querySelector('.portfolio-main-grid');
  if (projectContainer) {
    const files = ['projeto-branding-01.md']; // isso pode vir de um JSON estático ou ser dinâmico
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
                <a href="projeto1.html" class="view-btn"><i class="fas fa-eye"></i> Ver Projeto</a>
              </div>
            </div>
          </div>
        </div>
      `;
      projectContainer.appendChild(card);
    }
  }
}

// Função auxiliar para extrair frontmatter do markdown
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

loadCMSData();
