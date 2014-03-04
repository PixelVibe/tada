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
          linenos: true
        },
        /*files:
        [{
          cwd: 'src/assets/styles',
          src: 'layout.styl',
          dest: 'bin/assets/styles',
          ext: '.css'
        }]*/
        files:
        {
          'bin/assets/styles/layout.css' : 'src/assets/styles/layout.styl',
          'bin/assets/styles/main.css' : 'src/assets/styles/main.styl',
          'bin/assets/styles/mq.css' : 'src/assets/styles/mq.styl',
          'bin/assets/styles/reset.css' : 'src/assets/styles/reset.styl'
        }
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

    sync: {
      devToBin: {
        // files: [{src: ['src/app/**', 'src/assets/**', 'src/html/**', '!src/assets/styles/**'], dest: bin_dir}]
        files:
        [{
          cwd: 'src',
          src: ['app/**', 'assets/**', 'html/**', '!assets/styles/*.styl'],
          dest: 'bin'
        }]
      }
    },

    // Set readme template
    // Issue #56 - github
    readme: {
      options: {
        reasdme: 'docs/README.tmpl.md' // readme - check issue #56
      }
    },

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
          files: ['src/**/'],
          tasks: 'sync'
        },
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
  grunt.registerTask('binbuild', ['sync']);
  
  // Build readme file
  grunt.registerTask('breadme', ['readme']);
  grunt.registerTask('poutses', ['stylus:bin']);

};