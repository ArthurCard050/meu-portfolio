---
# Front Matter (Metadados que o Eleventy e o Decap CMS lerão)
title: "Meu Primeiro Projeto de Design"
date: "2024-07-29T10:00:00-03:00" # Importante para ordenação, incluir fuso horário se precisar
portfolio_image: "/uploads/602a4374.jpg" # Caminho relativo da pasta public_folder
short_description: "Design de UI/UX para um aplicativo móvel inovador."
categories:
  - "Design UI/UX"
  - "Aplicativos Móveis"
client: "Startup X"
services_provided:
  - "Pesquisa de Usuário"
  - "Wireframing"
  - "Prototipagem"
  - "Testes de Usabilidade"
project_url: "https://www.site-do-projeto.com" # Opcional
modal_info:
  modal_title: "Detalhes Aprofundados do Projeto Mobile"
  modal_gallery:
    - image: "/uploads/image-modal-1.jpg"
      caption: "Mockup da tela inicial"
    - image: "/uploads/image-modal-2.jpg"
      caption: "Fluxo de login"
    - image: "/uploads/image-modal-3.jpg"
      caption: "Componentes reutilizáveis"
  modal_description_detail: "Este projeto foi um desafio em otimização de fluxo de usuário para garantir a melhor experiência possível em dispositivos móveis, com foco em acessibilidade e performance."
  modal_project_link: "https://www.behance.net/meu-projeto-mobile" # Opcional
layout: "layouts/service.njk" # Este é o layout que o Eleventy usará para esta página
permalink: "portfolio/{{ page.fileSlug }}/index.html" # Define a URL da página (ex: /portfolio/meu-primeiro-projeto/)
---

## Introdução

Aqui vai a introdução detalhada do seu projeto, usando **Markdown** para formatar o texto.

### O Desafio

Descreva os problemas que você precisou resolver para este cliente.

### A Solução

Explique como você abordou e solucionou os problemas, talvez com subtítulos para diferentes fases (Pesquisa, Prototipagem, etc.).

* Ponto chave 1
* Ponto chave 2

### Resultados

Quais foram os resultados ou sucessos do projeto?

> "Uma citação inspiradora do cliente." - Nome do Cliente

---