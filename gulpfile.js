/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
var elixir = require('laravel-elixir');
var gulp = require('gulp');
var ts = require('gulp-typescript');
elixir.config.sourcemaps = false;

var tsProject = ts.createProject({
    declaration: false,
    noExternalResolve: true,
    out: 'output.js'
});
gulp.task('elixir', function() {
    return elixir(function(mix) {
        mix.scripts([
            "../../bower_components/bootstrap/dist/css/bootstrap.min.css",
            "../../bower_components/font-awesome/css/font-awesome.min.css",
            "../css/main.css"], 'public/css/main.css')
            .scripts([
                "../../bower_components/lodash/lodash.js",
                "../../bower_components/jquery/dist/jquery.min.js",
                "../../bower_components/bootstrap/dist/js/bootstrap.min.js",
                "../../bower_components/angular/angular.min.js",
                "../../bower_components/angular-route/angular-route.min.js",
                "../../bower_components/angular-animate/angular-animate.min.js",
                "../../bower_components/angular-bootstrap/ui-bootstrap.min.js",
                "../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
                "../../bower_components/angular-simple-logger/dist/angular-simple-logger.min.js",
                "google-map.min.js",
                "output.js"], 'public/js/main.js');
            mix.copy("../../bower_components/bootstrap/dist/fonts", 'public/fonts');
    });
});

gulp.task('scripts', function() {
    return gulp.src('resources/assets/typescript/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('resources/assets/js/'));
});

gulp.task('watch', ['scripts','elixir'], function() {
    gulp.watch(['resources/assets/typescript/**/*.ts'], ['scripts', 'elixir']);
    gulp.watch('resources/**/*.js', ['elixir']);
    gulp.watch('resources/**/*.css', ['elixir']);
});

