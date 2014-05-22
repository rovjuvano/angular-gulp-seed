# Setup

install node_modules

	npm install

install bower dependencies

	./node_modules/.bin/bower install

# Development

build and rebuild when source files change

	./node_modules/.bin/gulp

serve pages (e.g. using HTTP server from Python)

	cd dist
	python -m SimpleHTTPServer 8080
	open http://localhost:8080/

# Directory Structure

	src - source files
	src/**/*.jade - jade files converted to HTML
	src/**/*.less - less files converted to CSS
	src/**/*.js - js files copied as is
	dist - destination directory

# Common Changes

## Adding JavaScript library

 add via bower

	bower install acmejs

 edit Gulpfile.js and add source path to paths.raw

	var paths = {
		...,
		raw: [
			...,
			'bower_components/acmejs/acmejs.min.js',
		]
	}

# Under the hood

## Gulp tasks

	default - build, watch
	clean - clean build directory of generated files
	build - compile/transpile/copy sources files
	build:jade - convert jade source files into HTML
	build:css - convert less source files into CSS
	build:raw - copy files unaltered (e.g. JavaScript, vendor files)
	watch - rebuild sources as needed

## Gulp file paths

	paths.jade - file pattern of source jade files
	paths.less - file pattern of source less files
	paths.raw - file pattern of source files that need no processing

# Known Issues

* new files are not detected by watch. This is a limitation of watch.

# TODOS

* also build concatenated/minified version
* prime angular's $templateCache
* add test runner (mocha and karma are simple to setup and use in the meantime)
* add express
* add source file linting
