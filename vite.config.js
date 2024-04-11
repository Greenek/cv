import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import svelteMd from 'vite-plugin-svelte-md';

export default defineConfig({
  plugins: [svelteMd(), enhancedImages(), sveltekit()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
