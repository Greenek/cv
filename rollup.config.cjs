const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const livereload = require('rollup-plugin-livereload');
const svelte = require('rollup-plugin-svelte');
const { terser } = require('rollup-plugin-terser');
const { markdown } = require('svelte-preprocess-markdown');
const autoPreprocess = require('svelte-preprocess');
const css = require('rollup-plugin-css-only');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  input: 'src/main.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      extensions: ['.svelte', '.md'],
      compilerOptions: {
        dev: !production,
        // generate: 'ssr',
        hydratable: true,
        immutable: true,
      },
      preprocess: [
        markdown(),
        autoPreprocess({
          scss: {
            implementation: require('sass'),
            includePaths: ['src', 'node_modules'],
          },
          postcss: {
            plugins: [require('autoprefixer')],
          },
        }),
      ],
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('public'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
    include: 'src/**',
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}
