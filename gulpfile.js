const gulp = require('gulp');
const path = require('path');
const glob = require('glob');
const rollup = require('rollup-stream');
const r = require('rollup');
const mkdirp = require('mkdirp');
const fs = require('fs');
const livereload = require('gulp-livereload');
const uglify = require('rollup-plugin-uglify');
const buble = require('rollup-plugin-buble');
const multiEntry = require('rollup-plugin-multi-entry').default;
const typeScript = require('rollup-plugin-typescript');
const nodeResolve = require('rollup-plugin-node-resolve');
const connect = require('gulp-connect');
const karma = require('karma');
const tsc = require('typescript');
const tslint = require('gulp-tslint');
const del = require('del');
const pkg = require('./package.json');
const tsConfig = require("./tsconfig.json");
const tlConfig = require("./tslint.js");
const karmaConfig = path.resolve('config/karma.conf.js');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

function bundle(format, entry) {
	return rollup({
		entry: entry,
		plugins: [
			process.env.min === 'true' ? uglify({
				output: { comments: /@license/ },
				compress: { keep_fargs: false }
			}) : {},
			typeScript(
				Object.assign(tsConfig.compilerOptions, {
					typescript: tsc,
					target: 'es6',
					module: 'es6',
					declaration: false
				})
			),
			buble({})
		],
		format: format,
		moduleName: 'Sonai'
	});
}
function cleanTmp(done) {
	del(['tmp']).then(() => done());
}

// Remove our temporary files
gulp.task('clean:tmp', cleanTmp);


let firstBuild = true;

// Set up a livereload environment for our spec runner `test/runner.html`
gulp.task('browser', ['clean:tmp'], done => {

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
	}).then(bundle => {
		const result = bundle.generate({
			format: 'umd',
			moduleName: 'Sonai',
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

gulp.task('test:browser', function(done) {
		process.env.NODE_ENV = 'test';
		new karma.Server({
			configFile: karmaConfig,
			singleRun: true,
			browsers: ['Chrome']
		}, done).start();
	}
);

// Build a production bundle
gulp.task('build:prod', () => {
	process.env.NODE_ENV = 'production';
	process.env.min = true;

	return bundle('umd', 'src/index.ts')
		.pipe(source(pkg.name + '.min.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

// Build a production bundle
gulp.task('build:dev', () => {
	process.env.NODE_ENV = 'development';
	process.env.min = false;

	return bundle('umd', 'src/index.ts')
		.pipe(source(pkg.name + '.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

gulp.task('lint:test', () =>
	gulp.src('test/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('prose', {
			emitError: false
		}))
);

gulp.task('lint:src', () =>
	gulp.src('src/*.ts')
		.pipe(tslint())
		.pipe(tslint.report("prose", {
			emitError: false
		}))
);

gulp.task('lint', ['lint:src', 'lint:test']);
gulp.task('build', ['build:prod', 'build:dev']);
gulp.task('default', ['build']);