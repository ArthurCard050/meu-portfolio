const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // Copiar pastas de assets para a pasta de saída
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("static");
    eleventyConfig.addPassthroughCopy("admin");

    // Adiciona um filtro de data para formatar datas com o Luxon
    eleventyConfig.addFilter("postDate", (value) => {
  const dateObj = typeof value === 'string' ? new Date(value) : value;
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
});



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
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
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
