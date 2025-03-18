import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    prerender: {
      crawl: true,
      handleHttpError: ({ _path, _referrer, message }) => {
        throw new Error(message);
      },
    },
  },
  preprocess: [vitePreprocess()],
};

export default config;
