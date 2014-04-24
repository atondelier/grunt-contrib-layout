/* jshint node: true */

"use strict";

module.exports = function (grunt) {

    function createDirAndProcess(content, dirpath) {
        console.log('Create dir ', dirpath);
        // sync method since async method seems not to work properly
        require('fs').mkdirSync(dirpath);
        process(content, dirpath);
    }

    function process(array, prefix) {
        var i, l, e, exists, filepath, content, dirpath, type;
        if(!prefix) {
            prefix = '';
        }
        for (i = 0, l = array.length; i<l; i += 1) {
            e = array[i];
            filepath = prefix + e.name;
            exists = grunt.file.exists(filepath);
            content = e.content;
            type = e.type;
            if(type === 'dir' && content instanceof Array) {
                dirpath = filepath + '/';
                if(!exists) {
                    createDirAndProcess(content, dirpath);
                } else {
                    process(content, dirpath);
                }
            } else if(type === 'file') {
                if(!exists) {
                    console.log('Create file ', filepath);
                    grunt.file.write(filepath, content, { encoding: 'utf8' });
                }
            }
        }
    }

    grunt.registerMultiTask('layout', 'Generate a directory layout', function (arg) {

        var done = this.async();

        console.log(arg);

        process(this.data.tree);

        done();
    });

};