module.exports = function(grunt) {
  'use strict';

  var pkg = require('./package.json');

  // Initialize default options
  grunt.option.init({
    staging: false
  });

  // Load grunt tasks
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-dom-massager');
  grunt.loadNpmTasks('grunt-prettify');

  // Get target
  var target = grunt.option('staging') || 'dev';

  // Tasks config
  grunt.initConfig({
    pkg: pkg,

    assemble: {
      options: {
        assets: 'public/assets',
        development: grunt.option('no-staging'),
        flatten: true,
        layout: 'default-layout.hbs',
        layoutdir: 'src/views/layouts/',
        marked: {
          pedantic: true,
          smartypants: true
        },
        partials: 'src/views/partials/**/*.md',
        production: grunt.option('staging')
      },
      pages: {
        files: {
          'public/': ['src/views/pages/*.hbs']
        }
      }
    },

    clean: {
      build: ['public'],
      tmp: ['.tmp']
    },

    concat: {
      readme: {
        options: {
          separator: '\n\n***\n\n'
        },
        files: {
          'README.md': ['src/md/*.md']
        }
      }
    },

    connect: {
      server: {
        options: {
          port: '8000',
          hostname: 'cv.dev',
          base: ['public', '.'],
          livereload: true,
          open: {
            appName: 'Google Chrome'
          }
        }
      }
    },

    copy: {
      fontawesome: {
        files: [{
          expand: true,
          cwd: 'bower_components/font-awesome/fonts/',
          src: ['*'],
          dest: 'public/assets/fonts/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*'],
          dest: 'public/assets/images/'
        }]
      }
    },

    'dom_massager': {
      options: {
        writeDom: true,
        selectors: {
          'a[href^="http"]': {
            action: 'attr',
            input: {
              'rel': 'nofollow'
            }
          },
          'h1,h2,h3,h4': {
            action: 'removeAttr',
            input: ['id']
          }
        }
      },
      files: {
        src: 'public/index.html',
        dest: '.tmp/'
      }
    },

    less: {
      development: {
        options: {
          paths: [
            'bower_components',
            'src/css'
          ],
          plugins: [
            new(require('less-plugin-autoprefix'))({
              browsers: ["last 2 versions"]
            })
          ]
        },
        files: {
          'public/assets/style.css': [
            'src/css/style.less'
          ],
          'public/assets/markdown.css': [
            'src/css/markdown.less'
          ]
        }
      }
    },

    prettify: {
      options: {
        config: '.jsbeautifyrc'
      },
      index: {
        src: '.tmp/index.html',
        dest: 'public/index.html'
      }
    },

    uglify: {
      app: {
        options: {
          sourceMap: grunt.option('no-staging'),
          sourceMapName: 'public/assets/scripts.js.map'
        },
        files: {
          'public/assets/scripts.js': [
            'bower_components/zepto/zepto.js',
            'src/js/app.js'
          ]
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      content: {
        files: [
          'src/md/*.md',
          'src/views/**/*.hbs'
        ],
        tasks: [
          'concat:readme',
          'assemble',
          'dom_massager',
          'prettify'
        ]
      },
      gruntfile: {
        files: 'Gruntfile.js',
        options: {
          reload: true
        },
        tasks: [
          'build'
        ]
      },
      less: {
        files: [
          'src/css/**/*.less'
        ],
        options: {
          reload: false
        },
        tasks: [
          'less'
        ]
      },
      scripts: {
        files: [
          'src/js/**/*.js'
        ],
        tasks: [
          'uglify'
        ]
      },
      styles: {
        files: [
          'public/assets/*.css'
        ]
      }
    }
  });

  grunt.registerTask('assets', [
    'copy:fontawesome',
    'copy:images'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assets',
    'concat',
    'less',
    'assemble',
    'uglify',
    'dom_massager',
    'prettify',
    'clean:tmp'
  ]);

  grunt.registerTask('dev', [
    'build',
    'connect',
    'watch'
  ]);

  // Run
  grunt.registerTask('default', ['build']);
};
