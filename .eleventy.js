module.exports = function(eleventyConfig) {
    // Copiar pastas de assets para a pasta de saída
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("static"); // Mantenha esta para as imagens de upload
    eleventyConfig.addPassthroughCopy("admin");  // Pasta do Decap CMS

    // Adicionar um filtro personalizado para obter todas as categorias únicas
    eleventyConfig.addFilter("getAllCategories", collection => {
        let categories = new Set();
        collection.forEach(item => {
            if (item.data.categories) {
                item.data.categories.forEach(category => {
                    categories.add(category);
                });
            }
        });
        return Array.from(categories).sort();
    });

    // Adicionar um filtro para slugificar strings (se você não tiver um)
    eleventyConfig.addFilter("slug", text => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Substitui espaços por hífens
            .replace(/[^\w-]+/g, '')       // Remove caracteres não alfanuméricos
            .replace(/--+/g, '-')          // Substitui múltiplos hífens por um único
            .replace(/^-+/, '')            // Remove hífens do início
            .replace(/-+$/, '');           // Remove hífens do final
    });


    // Configurar o diretório de entrada para ser a raiz do projeto
    return {
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
};
