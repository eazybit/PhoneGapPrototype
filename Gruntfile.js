/**
 * Created by yxzhang on 9/19/16.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    noCache: true
                },
                files: {
                    'www/css/index.css' : 'www/css/index.scss'
                },
                update: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass']);
};