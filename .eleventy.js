module.exports = function(eleventyConfig) {
    // Copiar pastas de assets para a pasta de saída
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("static"); // Mantenha esta para as imagens de upload
    eleventyConfig.addPassthroughCopy("admin");  // Pasta do Decap CMS

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
