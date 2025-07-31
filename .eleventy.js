module.exports = function(eleventyConfig) {
    // 1. Copiar assets estáticos para a pasta de saída
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("admin"); // Para o Decap CMS

    // 2. Definir pastas de entrada e saída
    return {
        dir: {
            input: ".",        // A raiz do seu projeto é a pasta de entrada
            includes: "_includes", // Pasta para layouts, componentes HTML reutilizáveis
            data: "_data",       // Pasta para arquivos de dados globais (ex: categories.json)
            output: "_site"    // O Eleventy gerará o site compilado aqui
        },
        markdownTemplateEngine: "njk", // Usar Nunjucks para processar Markdown
        htmlTemplateEngine: "njk"      // Usar Nunjucks para processar arquivos HTML diretamente
    };
};