const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

const autoprefixer = require('autoprefixer');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');

const imagemin = require("gulp-imagemin");

const browserSyncServer = require("browser-sync").create();

const styles = () => {
	return gulp.src( './src/assets/sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer({ overrideBrowserslist: ['last 2 versions', 'ie >= 10'] })
	]))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest( './dist/assets/css/'))
	.pipe(browserSyncServer.stream());
}

const javascript = () => {
	return gulp.src('./src/assets/js/**/*.js')
	  .pipe(sourcemaps.init())
	  .pipe(eslint())
	  .pipe(babel())
	  .pipe(concat('main.min.js'))
	  .pipe(uglify())
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest( './dist/assets/js/'))
	  .pipe(browserSyncServer.stream());
}

const lib = () => {
	return gulp.src('./src/assets/lib/**/*.js')
	 .pipe(sourcemaps.init())
	 .pipe(sourcemaps.write('./'))
	 .pipe(gulp.dest( './dist/assets/lib/'))
}

const son = () => {
	return gulp.src('./src/assets/son/**/*.mp3')
	 .pipe(sourcemaps.init())
	 .pipe(sourcemaps.write('./'))
	 .pipe(gulp.dest( './dist/assets/son/'))
}

const html = () => {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest( './dist/'));
}

const fonts = () => {
	return gulp.src([
		"./src/assets/fonts/**/*.ttf",
		"./src/assets/fonts/**/*.woff",
		"./src/assets/fonts/**/*.woff2"
	])
		.pipe(gulp.dest('./dist/assets/fonts/'));
}

const personnel = () => {
	return gulp.src([
		"./src/personnel/**/*.html",
		"./src/personnel/**/*.css",
		"./src/personnel/**/*.js"
	])
		.pipe(gulp.dest('./dist/personnel/'));
}
const watchFiles = () => {
	gulp.watch("./src/assets/sass/**/*.scss", styles);
	gulp.watch("./src/assets/js/**/*.js", javascript);
	gulp.watch("./src/assets/lib/**/*.js", lib);
	gulp.watch("./src/assets/son/**/*.mp3", son);
	gulp.watch([
		"./src/assets/fonts/**/*.ttf",
		"./src/assets/fonts/**/*.woff",
		"./src/assets/fonts/**/*.woff2"
	], fonts);
	gulp.watch([
		"./src/personnel/**/*.html",
		"./src/personnel/**/*.css",
		"./src/personnel/**/*.js"
	], personnel);
	gulp.watch([
		"./src/assets/images/**/*.jpg",
		"./src/assets/images/**/*.png",
		"./src/assets/images/**/*.svg",
		"./src/assets/images/**/*.gif"
	],gulp.series(compressImages, browserReload));
	gulp.watch("./src/*.html", gulp.series(html, browserReload));
}

const browserSync = (done) => {
	browserSyncServer.init({
		server: {
		  baseDir: "./dist"
		},
		port: 3000
	  });
	  done();
}

const browserReload = (done) => {
	browserSyncServer.reload();
	done();
}

const compressImages = () => {
	return gulp.src([
		"./src/assets/images/**/*.jpg",
		"./src/assets/images/**/*.png",
		"./src/assets/images/**/*.svg",
		"./src/assets/images/**/*.gif"
	  ])
	 .pipe(imagemin({
		 progressive: true,
		 svgoPlugins: [{removeViewBox: false}]
	 }))
	 .pipe(gulp.dest('./dist/assets/images/'))
}

const build = gulp.series(html, styles, javascript, lib, son, personnel, compressImages, fonts);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));
const compress = gulp.series(compressImages);

exports.watch = watch;
exports.compress = compress;
exports.default = build;
