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
      .pipe(gulp.dest(dist))
      .pipe(browserSync.stream());
});
// compile scss to css, then prefixe it and minify and put to css folder in src
gulp.task('cssAll', () => {
    return gulp.src('./src/sass/*.scss', ['sass'])
      .pipe(sass())
      .pipe(prefixer({
        cascade: false
    }))
    .pipe(cssMinify({compatibility: 'ie8'}))
    .pipe(gulp.dest('./src/css'))
    .pipe(gulp.dest(dist + 'css'))
    .on('change', browserSync.reload);
});
// use babel and minify js and put to dist/js folder
gulp.task('jsAll', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(jsMinify())
        .pipe(gulp.dest(dist + 'js'))
        .on('end', browserSync.reload);
});
//minify img and put to dist/img folder
gulp.task('imgMinify', () => {
    return gulp.src('./src/img/*')
        .pipe(imgMinify())
        .pipe(gulp.dest(dist + 'img'))
        .on('end', browserSync.reload);
});
// copying logo folder to dist
gulp.task('copyLogo', () => {
    return gulp.src('./src/logo/*')
    .pipe(gulp.dest(dist + 'logo'));
});

gulp.task("watch", () => {
    browserSync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("htmlMinify"));
    gulp.watch("./src/css/*.css", gulp.parallel("cssAll"));
    gulp.watch("./src/js/*", gulp.parallel("jsAll"));
});

gulp.task('build', gulp.parallel("htmlMinify", "cssAll", "jsAll", "imgMinify", "copyLogo"));
gulp.task("default", gulp.parallel("watch", "build"));