module.exports = {
	files: [
		'dist/angular.min.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'dist/**/*.js',
		'spec/lib/**/*.js',
		'spec/**/*{[-_]s,S}pec.js'
	],
	frameworks: ['jasmine'],
	browsers: [
		'PhantomJS',
	],
	reporters: [ 'progress' ],
	port: 9876,
	singleRun: true,
	autoWatch: false,
	plugins: [
		'karma-jasmine',
		'karma-phantomjs-launcher',
		'karma-coffee-preprocessor',
	],
	// logLevel: config.LOG_INFO,
};
