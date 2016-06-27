// Requerements
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleanCSS    = require('gulp-clean-css');
var htmlmin     = require('gulp-htmlmin');
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var concat      = require('gulp-concat');
var plumber     = require('gulp-plumber');

// Static Server
gulp.task('serve',['watch'], function() {
    browserSync.init({
        server: "./dist/"
    });
});

//Watch files for changes and execute the build for that task
gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch("src/css/*.*css", ['sass']);
    gulp.watch("src/**/*.html", ['html']).on('change', browserSync.reload);
    gulp.watch("src/images/*", ['img']).on('change', browserSync.reload);
});

//Compress images
gulp.task('img', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin())
		    .pipe(gulp.dest('dist/images'))
});

// Compile html
gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});
// Compile js
gulp.task('js', function () {
   return gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
       .pipe(plumber())
       .pipe(uglify())
       .pipe(gulp.dest('dist/js/'));
});

//compiles all .min.js files to app.js
gulp.task('jsmin', function () {
   return gulp.src(['src/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
   return gulp.src("src/css/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts/'));
});

//Task that compiles everything into one package for deployment
gulp.task('build', ['img', 'html', 'js', 'sass', 'jsmin', 'fonts']);

//Task that first builds and then redirects to serve
gulp.task('default', ['serve']);
