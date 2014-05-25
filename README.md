# Setup

install node_modules

	npm install

install bower dependencies

	./node_modules/.bin/bower install

# Development

build and re-build when source files change

	./node_modules/.bin/gulp

serve pages (e.g. using HTTP server from Python)

	cd dist
	python -m SimpleHTTPServer 8080
	open http://localhost:8080/

# Directory Structure

	src/ - source files
	src/**/*.jade - jade files to convert to HTML
	src/**/*.less - less files to convert to CSS
	src/**/*.js - js files to copy as is
	dist/ - destination directory
	spec/ - test files
	spec/lib/ - test helper files

# Common Changes

## Adding JavaScript library

 add via bower

	bower install --save acmejs

 edit `config/gulp.js` and add source path to `paths.raw`

	var paths = {
		...,
		raw: [
			...,
			'bower_components/acmejs/acmejs.min.js',
		]
	}

# Under the hood

## Gulp tasks

	default - build, test, watch
	clean - clean build directory of generated files
	build - compile/transpile/copy sources files
	build:jade - convert jade source files into HTML
	build:css - convert less source files into CSS
	build:raw - copy files unaltered (e.g. JavaScript, vendor files)
	test - run test suite once
	watch - re-build and re-test as needed

## Gulp file paths

	paths.dist_dir - path to store built files
	paths.jade - file pattern of source jade files
	paths.less - file pattern of source less files
	paths.raw - file pattern of source files that need no processing
	paths.test.karma_config - path to karma config file
	paths.test.watch - file pattern of unit test dependencies

# TODOS

* also build concatenated/minified version
* prime angular's $templateCache
* add end-to-end test runner
* add source file linting
