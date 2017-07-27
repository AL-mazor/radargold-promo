var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	sync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	mainBowerFiles = require('gulp-main-bower-files'),
	filter = require('gulp-filter'),
	merge = require('merge-stream'),
	imagemin = require('gulp-imagemin');

// pathes to files
var paths = {
	scss: ['src/css/*.scss' , 'src/*.scss'],
	jade: ['src/*.jade', 'src/template/*.jade'],
	scripts: ['src/js/*.js'],
	images: ['src/img/*']
}

// scss to css
gulp.task('css', function () {
	return gulp.src(paths.scss)
			.pipe(sass())
			.pipe(autoprefixer({
				  browsers: ['last 2 versions']
			}))
			.pipe(gulp.dest('dist'))
			.pipe(sync.stream());

});

// Jade to Html
gulp.task('html', function () {
	return gulp.src(paths.jade)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream());
});

//scripts
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(sync.stream());
});

gulp.task('imagemin', function () {
	return gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
})

// browser sync
gulp.task('serve', ['css', 'html', 'scripts'], function() {
	sync.init({
		server: {
			baseDir: "./dist"
		}
	});

	gulp.watch(paths.scss, ['css']);
	gulp.watch(paths.jade, ['html']);
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch('dist/*.html').on('change', sync.reload);
});


gulp.task('default', [ 'serve' ]);