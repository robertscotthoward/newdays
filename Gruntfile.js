/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    ftp_push: {
      infinity: {
        options: {
          authKey: "infinity",
          host: "ftpupload.net",
          dest: "./htdocs",
          port: 21,
          incrementalUpdates: false
        },
        files: [
          {
            expand: true,
            cwd: '.',
            src: [
              "data.json",
              "favicon.ico",
              "index.html",
              "README.md",
              "script.js",
              "style.css",
              "pages/**",
              "images/**",
            ]
          }
        ]
      }
    }    
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-ftp-push');

  // Default task.
  var target = grunt.option('target') || 'infinity';
  grunt.registerTask('default', ['ftp_push:' + target]);

};
