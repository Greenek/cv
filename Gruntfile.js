module.exports = function(grunt) {
  'use strict';

  var pkg = require('./package.json');

  // Load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown');

  // Tasks config
  grunt.initConfig({
    pkg: pkg,

    copy: {
      fontawesome: {
        files: [{
          expand: true,
          cwd: 'bower_components/font-awesome/fonts/',
          src: ['*'],
          dest: 'assets/fonts/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*'],
          dest: 'assets/images/'
        }]
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
          'assets/style.css': [
            'src/css/style.less'
          ]
        }
      }
    },

    markdown: {
      resume: {
        files: {
          'index.html': [
            'readme.md'
          ]
        },
        options: {
          template: 'src/resume.jst',
          preCompile: function(src, context) {
            var start;
            var contextVariables;

            // Get start offset
            start = src.match(/\*{3}/i);
            src = src.substr(start.index + start[0].length);

            // Set template context
            contextVariables = src.match(/# (.+)\n## (.+)/i);

            context.title = 'Curricula Vitae of ' + contextVariables[1];
            context.title += ' • ' + contextVariables[2];

            return src;
          },
          postCompile: function(src, context) {
            var sections;

            sections = src.split('\n<hr>\n');
            context.sections = {};

            var getSectionId = function(match, id) {
              key = id;
              return '<h3>';
            };

            for (var i = 0, len = sections.length; i < len; ++i) {
              var key;
              var section = sections[i];

              if (i === 0) {
                key = 'header';
              } else {
                sections[i].replace(/<h3 id="([a-z]+)(-[a-z-]+)?">/, getSectionId.bind(this));
              }

              context.sections[key] = section;
            }

            return src;
          },
          markdownOptions: {
            gfm: true,
            highlight: 'manual'
          }
        }
      }
    },

    uglify: {
      app: {
        options: {
          sourceMap: true,
          sourceMapName: 'assets/scripts.js.map'
        },
        files: {
          'assets/scripts.js': [
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
          'README.md',
          'src/resume.jst'
        ],
        tasks: [
          'markdown'
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
          'src/css/**/*.less'
        ],
        tasks: [
          'less'
        ]
      }
    }
  });

  grunt.registerTask('assets', [
    'copy:fontawesome',
    'copy:images'
  ]);

  grunt.registerTask('build', [
    'assets',
    'less',
    'markdown',
    'uglify'
  ]);

  grunt.registerTask('dev', [
    'build',
    'watch'
  ]);

  // Run
  grunt.registerTask('default', ['build']);
};
