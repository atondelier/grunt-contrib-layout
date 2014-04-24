"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        layout: grunt.file.readJSON('grunt-layout.json')
    });
    require('./tasks/layout.js')(grunt);

    // register default task
    grunt.registerTask('default', ['layout']);
};