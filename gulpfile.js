const gulp = require("gulp");
const sass = require('gulp-sass');
const cssMinify = require('gulp-clean-css');
const prefixer = require('gulp-autoprefixer');
const jsMinify = require('gulp-uglify');
const htmlMinify = require('gulp-htmlmin');
const imgMinify = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const babel = require("gulp-babel");

const dist = "./dist/";

//minify html and put to dist folder
gulp.task('htmlMinify', () => {
    return gulp.src('src/*.html')
      .pipe(htmlMinify({ collapseWhitespace: true }))
      .pipe(gulp.dest(dist));
});
// compile scss to css, then prefixe it and minify and put to css folder in src
gulp.task('cssAll', () => {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefixer({
            cascade: false
        }))
        .pipe(gulp.dest(dist + 'css'));
});
// use babel and minify js and put to dist/js folder
gulp.task('jsAll', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(jsMinify())
        .pipe(gulp.dest(dist + 'js'));
});
//minify img and put to dist/img folder
gulp.task('imgMinify', () => {
    return gulp.src('./src/img/*')
        .pipe(imgMinify())
        .pipe(gulp.dest(dist + 'img'));
});
// copying logo folder to dist
gulp.task('copyLogo', () => {
    return gulp.src('./src/logo/*')
    .pipe(gulp.dest(dist + 'logo'));
});

gulp.task("watch", () => {
    browserSync.init({
		server: dist,
		port: 4000
    });
    
    gulp.watch("./src/index.html").on('end', browserSync.reload);
    gulp.watch("./src/css/*.css", gulp.parallel("cssAll"));
    gulp.watch("./src/js/*").on('end', browserSync.reload);
});

gulp.task('build', gulp.parallel("htmlMinify", "cssAll", "jsAll", "imgMinify", "copyLogo"));
gulp.task("default", gulp.parallel('watch', 'build'));