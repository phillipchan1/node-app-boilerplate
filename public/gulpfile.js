// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

// Compile SASS
gulp.task('sass', function() {
	return sass('src/css/**/*.scss', { style: 'compressed' })
	.pipe(concat('app.css'))
	.pipe(gulp.dest('css'))
	.pipe(livereload());
});

// combine JS
gulp.task('scripts', function() {
	return gulp.src([
			// plugins
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/uikit/js/uikit.min.js',
			'src/js/**/*.js'
		])
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('js'))
		.pipe(livereload());
});

// listen for html changes
gulp.task('html', function() {
	return gulp.src([
		'index.html'
	])
	.pipe(livereload());
});

// Watch for changes
gulp.task('watch', function() {
	// watch html files
	gulp.watch('**/*.html', ['html']);
	// Watch .js files
	gulp.watch('src/js/**/*.js', function(callback) {
		runSequence(
			'scripts'
		)
	});
	// Watch .scss files
	gulp.watch('src/css/**/*.scss', ['sass']);
	// automatically reload browser
	livereload.listen();
});

// Default Task
gulp.task('default', function(callback) {
	runSequence(
		'scripts',
		'sass',
		'html',
		'watch'
	)
});