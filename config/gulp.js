const DIST_DIR = 'dist/';

module.exports = {
	dist_dir: DIST_DIR,
	paths: {
		jade: ['src/**/*.jade'],
		less: ['src/**/*.less'],
		raw: ['src/**/*.js',
			'bower_components/angular/angular.min.js{,.map}',
		],
		test: {
			karma_config: './config/karma.js',
			watch: ['spec/**/*', DIST_DIR + '**/*'],
		},
	}
}
