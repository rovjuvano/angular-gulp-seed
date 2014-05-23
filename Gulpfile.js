var gulp = require('gulp'),
	clean = require('gulp-clean'),
	jadeToHtml = require('gulp-jade'),
	lessToCss = require('gulp-less'),
	cssAutoprefixer = require('gulp-autoprefixer'),
	mocha = require('gulp-mocha'),
	pkg = require('./package.json');

var paths = {
	jade: ['./src/**/*.jade'],
	less: ['./src/**/*.less'],
	raw: ['./src/**/*.js',
		'bower_components/angular/angular.min.js{,.map}',
	],
	test: 'spec/**/*{[-_]s,S}pec.js',
}

const DIST_DIR = './dist';

gulp.task('default', ['test', 'watch']);
gulp.task('clean', function() {
	gulp.src(DIST_DIR, {read: false})
		.pipe(clean());
})

gulp.task('build', ['build:jade', 'build:less', 'build:raw']);
gulp.task('build:jade', function() {
	return gulp.src(paths.jade)
		.pipe(jadeToHtml())
		.pipe(gulp.dest(DIST_DIR));
});
gulp.task('build:less', function() {
	return gulp.src(paths.less)
		.pipe(lessToCss())
		.pipe(cssAutoprefixer())
		.pipe(gulp.dest(DIST_DIR));
});
gulp.task('build:raw', function() {
	return gulp.src(paths.raw)
		.pipe(gulp.dest(DIST_DIR));
});

gulp.task('watch', function() {
	gulp.watch(paths.jade, ['watch:jade']);
	gulp.watch(paths.less, ['watch:less']);
	gulp.watch(paths.raw, ['watch:raw']);
	gulp.watch('spec/**/*', ['watch:test']);
});
gulp.task('watch:jade', ['build:jade'], runTests);
gulp.task('watch:less', ['build:less']);
gulp.task('watch:raw', ['build:raw'], runTests);
gulp.task('watch:test', [], runTests);

gulp.task('test', ['build'], runTests);
function runTests() {
   return gulp.src(paths.test, { read: false })
        .pipe(mocha({ reporter: 'min' }));
};
