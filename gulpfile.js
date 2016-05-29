const gulp = require('gulp');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const rollup = require('rollup-stream');
const r = require('rollup');
const mkdirp = require('mkdirp');
const livereload = require('gulp-livereload');
const uglify = require('rollup-plugin-uglify');
const buble = require('rollup-plugin-buble');
const multiEntry = require('rollup-plugin-multi-entry').default;
const typeScript = require('rollup-plugin-typescript');
const nodeResolve = require('rollup-plugin-node-resolve');
const filesize = require('rollup-plugin-filesize');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const karma = require('karma');
const tsc = require('typescript');
const tslint = require('gulp-tslint');
const bump = require('gulp-bump');
const del = require('del');
const pkg = require('./package.json');
const tsConfig = require("./tsconfig.json");
const tlConfig = require("./tslint.js");
const karmaConfig = path.resolve('config/karma.conf.js');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/*
 * Banner
 **/
const copyright =
	'/*!\n' +
	' * ' + pkg.name + ' v' + pkg.version + '\n' +
	' * (c) ' + new Date().getFullYear() + ' ' + pkg.author.name + '\n' +
	' * Released under the ' + pkg.license + ' License.\n' +
	' */';


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
			typeScript(
				Object.assign(tsConfig.compilerOptions, {
					typescript: tsc,
					target: 'es6',
					module: 'es6',
					declaration: false
				})
			),
			buble({}),
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

function runKarma(browser, singlerun) {
	return function(done) {
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

function rudnKarma(browser, singlerun, done) {
	new karma.Server({
			configFile: karmaConfig,
			singleRun: singlerun,
			browser: browser,
			browserNoActivityTimeout: 240000,
			captureTimeout: 120000
		},
		function(err) {
			done();
			process.exit(err ? 1 : 0);
		})
		.start();
}

function lint(files) {
	return gulp.src(files)
		.pipe(tslint())
		.pipe(tslint.report("prose", {
			emitError: false
		}));
}

var firstBuild = true;

// Set up a livereload environment for our spec runner `test/runner.html`
gulp.task('browser', ['clean:tmp'], function(done) {

	const testFiles = glob.sync('./test/**/*.ts')
		.concat(glob.sync('./test/**/*.ts'));
	r.rollup({
		entry: ['./config/setup/browser.js'].concat(testFiles),
		plugins: [
			multiEntry(),
			typeScript(
				Object.assign(tsConfig.compilerOptions, {
					typescript: tsc,
					target: 'es6',
					module: 'es6',
					declaration: false
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
			gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['browser']);
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

// Build a production bundle
gulp.task('build:dev', function() {
	process.env.NODE_ENV = 'development';
	process.env.min = false;

	return bundle('umd', 'src/index.ts')
		.pipe(source(pkg.name + '.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

gulp.task('test', ['test:chrome', 'test:phantom']);
gulp.task('test:chrome', runKarma('Chrome', true));
gulp.task('test:phantom', runKarma('PhantomJS', true));

gulp.task('watch:browser', ['watch:chrome', 'watch:phantom']);

gulp.task('watch:chrome', runKarma('Chrome', false));
gulp.task('watch:phantom', runKarma('PhantomJS', false));


gulp.task('bump', function() {
	gulp.src('./package.json')
	.pipe(bump())
	.pipe(gulp.dest('./'));
});

// Lint everything
gulp.task('lint', ['lint:src', 'lint:test']);
// Lint the source files
gulp.task('lint:src', function() { lint('src/**/*.ts')});
// Lint the test files
gulp.task('lint:test', function() { lint('test/*.ts')});

// Remove temporary files
gulp.task('clean:tmp', function(done) {
	del(['tmp']).then(function() { done()});
});

gulp.task('lint', ['lint:src', 'lint:test']);
gulp.task('build', ['build:prod', 'build:dev']);
gulp.task('default', ['build']);