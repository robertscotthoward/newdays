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
    },
  shell: {  
    command: ["git log | head > build.txt"].join('&&')  
  }
});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-ftp-push');
  grunt.loadNpmTasks('grunt-shell');

  // Default task.
  var target = grunt.option('target') || 'infinity';
  grunt.registerTask('default', ['shell', 'ftp_push:' + target]);

};
