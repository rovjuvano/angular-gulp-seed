var gulp = require('gulp'),
	clean = require('gulp-clean'),
	cached = require('gulp-cached'),
	jadeToHtml = require('gulp-jade'),
	lessToCss = require('gulp-less'),
	cssAutoprefixer = require('gulp-autoprefixer'),
	karma = require('karma').server,
	pkg = require('./package.json');

const DIST_DIR = 'dist';

var paths = {
	jade: ['src/**/*.jade'],
	less: ['src/**/*.less'],
	raw: ['src/**/*.js',
		'bower_components/angular/angular.min.js{,.map}',
	],
	test: {
		run: [
			'dist/angular.min.js',
			'dist/**/*.js',
			'spec/**/*{[-_]s,S}pec.js'
		],
		watch: ['spec/**/*', DIST_DIR + '**/*'],
	},
}

gulp.task('default', ['watch']);
gulp.task('clean', function() {
	gulp.src(DIST_DIR, {read: false})
		.pipe(clean());
})

gulp.task('build', ['build:jade', 'build:less', 'build:raw']);
gulp.task('build:jade', function() {
	return gulp.src(paths.jade)
		.pipe(cached('src'))
		.pipe(jadeToHtml())
		.pipe(gulp.dest(DIST_DIR));
});
gulp.task('build:less', function() {
	return gulp.src(paths.less)
		.pipe(cached('src'))
		.pipe(lessToCss())
		.pipe(cssAutoprefixer())
		.pipe(gulp.dest(DIST_DIR));
});
gulp.task('build:raw', function() {
	return gulp.src(paths.raw)
		.pipe(cached('src'))
		.pipe(gulp.dest(DIST_DIR));
});

gulp.task('watch', ['test'], function() {
	gulp.watch(paths.jade, ['build:jade']);
	gulp.watch(paths.less, ['build:less']);
	gulp.watch(paths.raw, ['build:raw']);
	gulp.watch(paths.test.watch, ['test:unit']);
});

gulp.task('test', ['build'], function() { return gulp.start('test:unit') });
gulp.task('test:unit', function(cb) {
	karma.start({
		files: [
			'dist/angular.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'dist/**/*.js',
			'spec/**/*{[-_]s,S}pec.js'
		],
		frameworks: ['jasmine'],
		browsers: ['PhantomJS'],
		reporters: [ 'progress' ],
		port: 9876,
		singleRun: true,
		autoWatch: false,
		plugins: [ 'karma-jasmine', 'karma-phantomjs-launcher' ],
		// logLevel: config.LOG_INFO,
	}, function (exitCode) {
		cb();
	});
});
