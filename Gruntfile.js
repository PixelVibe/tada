module.exports = function(grunt)
{
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Set readme template
    /*readme: {
      options: {
        readme: 'docs/README.tmpl.md'
      }
    }*/

  });

  // Automate readme files based on templates
  grunt.loadNpmTasks('grunt-readme');

  // Automate project versioning
  grunt.loadNpmTasks('grunt-version');

};