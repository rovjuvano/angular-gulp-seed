var gulp = require('gulp'),
	gulpConfig = require('./config/gulp.js'),
	clean = require('gulp-clean'),
	cached = require('gulp-cached'),
	jadeToHtml = require('gulp-jade'),
	lessToCss = require('gulp-less'),
	cssAutoprefixer = require('gulp-autoprefixer'),
	karma = require('karma').server,
	karmaConfig = require(gulpConfig.paths.test.karma_config),
	pkg = require('./package.json');

var DIST_DIR = gulpConfig.dist_dir;
var paths = gulpConfig.paths;

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
	gulp.watch(paths.test.karma_config, function(event) {
		delete require.cache[require.resolve(paths.test.karma_config)];
		karmaConfig = require(paths.test.karma_config);
		return gulp.start('test:unit');
	});
});

gulp.task('test', ['build'], function() { return gulp.start('test:unit') });
gulp.task('test:unit', function(cb) {
	karma.start(karmaConfig, function (exitCode) {
		cb();
	});
});
