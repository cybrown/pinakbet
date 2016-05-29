const gulp = require('gulp');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const stylish = require('gulp-tslint-stylish');
const rollup = require('rollup-stream');
const r = require('rollup');
const mkdirp = require('mkdirp');
const livereload = require('gulp-livereload');
const uglify = require('rollup-plugin-uglify');
const buble = require('rollup-plugin-buble');
const multiEntry = require('rollup-plugin-multi-entry').default;
const typeScript = require('rollup-plugin-typescript');
const nodeResolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const filesize = require('rollup-plugin-filesize');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const karma = require('karma');
const tsc = require('typescript');
const tslint = require('gulp-tslint');
const bump = require('gulp-bump');
const del = require('del');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const pkg = require('./package.json');
const tscConfig = require('./tsconfig.json');
const karmaConfig = path.resolve('config/karma.conf.js');

/*
 * Banner
 **/
const copyright =
	'/*!\n' +
	' * ' + pkg.name + ' v' + pkg.version + '\n' +
	' * (c) ' + new Date().getFullYear() + ' ' + pkg.author.name + '\n' +
	' * Released under the ' + pkg.license + ' License.\n' +
	' */';

// TypeScript compile
function bundle(format, entry) {
	return rollup({
		entry: entry,
		sourceMap: false,
		banner: copyright,
		plugins: [
			process.env.min === 'true' ? uglify({
				warnings: false,
				compress: {
					screw_ie8: true,
					dead_code: true,
					unused: true,
					keep_fargs: false,
					drop_debugger: true
				},
				mangle: {
					screw_ie8: true
				}
			}) : {},
			json(),
			typeScript(
				Object.assign(tscConfig.compilerOptions, {
					typescript: tsc
				})
			),
			buble({
				exclude: 'node_modules/**'
			}),
			nodeResolve({
				// use "jsnext:main" if possible
				// – see https://github.com/rollup/rollup/wiki/jsnext:main
				jsnext: true,
				// use "main" field or index.js, even if it's not an ES6 module
				// (needs to be converted from CommonJS to ES6
				// – see https://github.com/rollup/rollup-plugin-commonjs
				main: true,
				// if there's something your bundle requires that you DON'T
				// want to include, add it to 'skip'
				skip: [],
				// some package.json files have a `browser` field which
				// specifies alternative files to load for people bundling
				// for the browser. If that's you, use this option, otherwise
				// pkg.browser will be ignored
				browser: true
			}),
			commonjs(),
			filesize(),
			replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
				VERSION: pkg.version
			})
		],
		format: format,
		moduleName: pkg.name[0].toUpperCase() + pkg.name.slice(1)
	});
}

function runKarma(browser, singlerun, isKeptAnEyeOn) {
	return function(done) {

		if (isKeptAnEyeOn) {
			console.log('=== Unit Test Watch Mode ===');
			console.log('- It will autowatch the changed files and re-run the test');
			console.log('- Press Cmd/Ctrl + C to exit and get the coverage result');
			console.log('- Press Cmd/Ctrl + C again to close the TSC watch.');
		}

		process.env.NODE_ENV = 'test';
		new karma.Server({
				configFile: path.resolve('config/karma.conf.js'),
				singleRun: singlerun,
				browserNoActivityTimeout: 240000,
				captureTimeout: 120000,
				browsers: [browser]
			},
			function(err) {
				done();
				process.exit(err ? 1 : 0);
			})
			.start();
	}
}

function lint(files) {
	return gulp.src(files)
		.pipe(tslint())
		.pipe(tslint.report(stylish, {
			emitError: false,
			sort: true,
			bell: true,
			fullPath: true
		}));
}

var firstBuild = true;

// Set up a livereload environment for our spec runner `test/runner.html`
gulp.task('browser', ['clean:tmp'], function(done) {

	const testFiles = glob.sync('./test/**/*.ts');
	r.rollup({
		entry: ['./config/setup/browser.js'].concat(testFiles),
		plugins: [
			multiEntry(),
			typeScript(
				Object.assign(tscConfig.compilerOptions, {
					typescript: tsc
				})
			),
			buble({
				exclude: 'node_modules/**'
			})
		]
	}).then(function(bundle) {
		const result = bundle.generate({
			format: 'umd',
			moduleName: pkg.name[0].toUpperCase() + pkg.name.slice(1),
			sourceMap: 'inline',
			sourceMapSource: 'index.js',
			sourceMapFile: pkg.name + '.js'
		});

		// Write the generated sourcemap
		mkdirp.sync('tmp');
		fs.writeFileSync(path.join('tmp', '__specs.js'), result.code + '\n//# sourceMappingURL=./__specs.js.map');
		fs.writeFileSync(path.join('tmp', '__specs.js.map'), result.map.toString());

		if (firstBuild) {
			// we listen to both the browser and node.js unit tests
			livereload.listen({port: 35729, host: 'localhost', start: true});
			gulp.watch(['src/**/*.ts', 'test/**/*.ts', 'tslint.json', 'gulpfile.js', 'tsconfig'], ['browser', 'lint']);
		} else {
			livereload.reload('./tmp/__specs.js');
		}
		firstBuild = false;

		done();
	}).catch(console.error);
});

// Build a production bundle
gulp.task('build:prod', function() {
	process.env.NODE_ENV = 'production';
	process.env.min = true;

	return bundle('umd', 'src/index.ts')
		.pipe(source(pkg.name + '.min.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

// Build a development bundle
gulp.task('build:dev', function() {
	process.env.NODE_ENV = 'development';
	process.env.min = false;

	return bundle('umd', 'src/index.ts')
		.pipe(source(pkg.name + '.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

// Build a production bundle
gulp.task('build:iife', function() {
	process.env.NODE_ENV = 'undefined';
	process.env.min = false;

	return bundle('iife', 'src/index.ts')
		.pipe(source(pkg.name + '.iife.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

// Build a production bundle
gulp.task('build:es6', function() {
	process.env.NODE_ENV = 'undefined';
	process.env.min = false;

	return bundle('es6', 'src/index.ts')
		.pipe(source(pkg.name + '.es6.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

gulp.task('test', ['test:chrome']);
gulp.task('test:chrome', runKarma('Chrome', true, true));
gulp.task('test:phantom', runKarma('PhantomJS', true, true));
gulp.task('watch', ['watch:chrome', 'lint']);
gulp.task('watch:browser', ['watch:chrome', 'lint']);
gulp.task('watch:chrome', runKarma('Chrome', false, true));
gulp.task('watch:phantom', runKarma('PhantomJS', false, true));

gulp.task('bump', function() {
	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

// clean the contents of the distribution directory
gulp.task('clean', function(cb) {
// delete the files
	del(['dist/**/*']);
});

// Lint everything
gulp.task('lint', ['lint:src', 'lint:test']);
// Lint all TypeScript source files.
gulp.task('lint:src', function() { lint('src/**/*.ts')});
// Lint all TypeScript test files.
gulp.task('lint:test', function() { lint('test/*.ts')});
// Remove temporary files
gulp.task('clean:tmp', function(done) {
	del(['tmp']).then(function() { done()});
});

gulp.task('lint', ['lint:src', 'lint:test']);
gulp.task('build', ['build:prod', 'build:dev', 'build:es6']);
gulp.task('default', ['lint', 'test:chrome']);