module.exports = {
	files: [
		'dist/angular.min.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'dist/**/*.js',
		'spec/lib/**/*.js',
		'spec/**/*{[-_]s,S}pec.{js,coffee}'
	],
	frameworks: ['jasmine-given', 'jasmine'],
	browsers: [
		'PhantomJS',
	],
	reporters: [ 'progress' ],
	port: 9876,
	singleRun: true,
	autoWatch: false,
	plugins: [
		'karma-jasmine',
		'karma-jasmine-given',
		'karma-phantomjs-launcher',
		'karma-coffee-preprocessor',
	],
	preprocessors: {
		'**/*.coffee': ['coffee'],
	},
	// logLevel: config.LOG_INFO,
};
