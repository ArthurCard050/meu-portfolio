import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  // O ponto de entrada principal que importa todos os outros scripts
  input: 'js/script.js', 

  output: {
    file: 'js/bundle.min.js', // O nome do arquivo JS minificado de saída
    format: 'iife',          // 'iife' é ideal para scripts que você inclui diretamente no HTML
    name: 'portfolioApp',    // Um nome global para seu bundle (opcional, mas bom para evitar conflitos)
    sourcemap: true,         // Gera um sourcemap para facilitar o debug do código original
  },

  plugins: [
    nodeResolve(), // Resolve módulos de node_modules (se você tivesse algum)
    terser(),      // Minifica o código JavaScript
  ],
};