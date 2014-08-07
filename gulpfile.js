var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();

gulp.task('dev', [], function () {
    // start express server by supervisor
    plugins.supervisor('index.js', {
        watch: ['index.js', 'apps', 'config'],
        ignore: [],
        extensions: ['js', 'coffee', 'html']
    });
});
