module.exports = function(grunt)
{

  // Structure / Directories
  var dist_dir    = 'dist/';
  var bin_dir     = 'bin/';
  var styles_dir  = 'assets/styles/';
  var scripts_dir = 'assets/scripts/';
  var images_dir  = 'assets/images/';

  // Destinations
  var bin_styles   = bin_dir + styles_dir;
  var bin_scripts  = bin_dir + scripts_dir;
  var bin_images   = bin_dir + images_dir;
  var dist_styles  = dist_dir + styles_dir;
  var dist_scripts = dist_dir + scripts_dir;
  var dist_images  = dist_dir + images_dir;

  // Structure / Files
  var css_files_bin = [bin_styles + 'reset.css', bin_styles + 'main.css', bin_styles + 'mq.css', bin_styles + 'mobile.css', bin_styles + 'layout.css'];
  var css_files_src = ['src/assets/styles/reset.styl', 'src/assets/styles/main.styl', 'src/assets/styles/mq.styl', 'src/assets/styles/mobile.styl', 'src/assets/styles/layout.styl'];

  // Project configuration.
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),

    // compile stylus files to css files. Watch task
    stylus:
    {
      bin:
      {
        options:
        {
          compress: false,
          linenos: true,
        },
        files:
        [{
          cwd: 'src/assets/styles/',
          src: [ '*.styl' ],
          dest: 'bin/assets/styles/',
          ext: '.css'
        }]
      },
      dist:
      {
        options:
        {
          compress: true,
          linenos: false,
        },
        files: // Config dist to concat files
        [{
          cwd: 'src/assets/styles/',
          src: [ '*.styl' ],
          dest: 'bin/assets/styles/',
          ext: '.css'
        }]
      }
    },

    // js check
    jshint:
    {
      options:
      {
        'eqeqeq':   true, // == vs ===
        'forin':    true, // for in loops
        'trailing': true, // extra spaces
        'sub':      true
      },
      // Check js before sending it to bin
      devToBin:
      {
        src: ['src/assets/scripts/*.js', 'src/app/**/*.js']
      }
    },

    // Set readme template
    // Issue #56 - github
    readme: {
      options: {
        readme: 'docs/README.tmpl.md'
      }
    },

     // Keep in sync js scripts from source to bin
    sync: {
      main: {
        files:
        [{
          cwd: 'src/assets/scripts',
          src: '**',
          dest: bin_scripts
        }],
        [{
          cwd: 'src/assets/images',
          src: '**',
          dest: 'bin_images'
        }]
      }
    },

    /* CONFIG REQUIRED */
    // Remove console.log() statements
    removelogging: {
        dist: {
          src: ['src/app/*.js', 'src/assets/scripts/*.js'],
          dest: "js/application-clean.js",

          options: {
            // see below for options. this is optional.
          }
        }
      }
    }),

    // Watcher
    watch: {
        stylus:{
          files: 'src/assets/styles/*.styl',
          tasks: 'stylus:bin'
        },
        jscheck:
        {
          files: ['src/assets/scripts/*.js', 'src/app/**/*.js'],
          task:  'jshint:devToBin'
        },
        synctobin:
        {
          files: ['src/**'],
          tasks: 'sync'
        }
        livereload: {
            options: { livereload: true },
            files: [bin_styles + '*.css', bin_scripts + '*.js', 'static/*.html', '*.php', 'templates/*.php', bin_images + '**/*.*']
        }
    }

  });

  // Autoload all grunt plugins in devdependendencies
  require('load-grunt-tasks')(grunt);
  
  // Watcher for development
  grunt.registerTask('devwatch', ['watch']);
  
  // Bin building prior to dev
  grunt.registerTask('binbuild', ['stylus:bin']);
  
  // Build readme file
  grunt.registerTask('binbuild', ['readme']);

};