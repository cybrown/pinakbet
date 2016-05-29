### Pinakbet

[![Build Status](https://travis-ci.org/Kflash/pinakbet.svg?branch=master)](https://travis-ci.org/Kflash/pinakbet)
[![CircleCI](https://circleci.com/gh/Kflash/pinakbet.svg?style=svg)](https://circleci.com/gh/Kflash/pinakbet)
[![Coverage Status](https://coveralls.io/repos/github/Kflash/pinakbet/badge.svg?branch=master)](https://coveralls.io/github/Kflash/pinakbet?branch=master)
[![npm version](https://badge.fury.io/js/pinakbet.svg)](https://badge.fury.io/js/pinakbet)
[![npm downloads](https://img.shields.io/npm/dm/pinakbet.svg)](https://www.npmjs.org/package/pinakbet)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/kflash/pinakbet/blob/master/LICENSE.md)


> TypeScript starter kit, using Rollup, and Bublé

## Features

* [Bublé](https://gitlab.com/Rich-Harris/buble) as the ES2015 compiler
* [Rollup](http://rollupjs.org/) for bundling
* [Typescript](https://www.typescriptlang.org/) for building scalable applications
* [TSLint](https://palantir.github.io/tslint/) to maintain a consistent code style
* [Karma](http://karma-runner.github.io/0.13/index.html) as the test runner
* [Sinon.JS](http://sinonjs.org/) with examples for test doubles
* [JSX](https://facebook.github.io/jsx/) support with [Bublé](https://gitlab.com/Rich-Harris/buble)
* [Angular 2.0 support](https://angularjs.org/)
* Node >= 4.x

## Quick start

The only development dependency of this project is [Node.js](https://nodejs.org/en/). So just make sure you have it installed. Then type few commands known to every Node developer...

```js
$ git clone https://github.com/kflash/pinakbet.git
$ cd pinakbet
$ npm install                   # Install Node modules listed in ./package.json
$ npm run build                 # Build a minified and a non-minified version of the library
```

... and boom! You have it all setup for you!

## Workflow

* `npm run build` - build task that generate a minified and a non-minified script
* `npm run build:prod` - build task that generate a production bundle
* `npm run build:dev` - build task that generate a development bundle
* `npm run build:iife` - build task that generate a iife bundle
* `npm run build:es6` - build task that generate a es2015 bundle
* `npm run lint:src` - lint the source
* `npm run lint:tests` - lint the unit tests
* `npm run test` - runs unit tests for both node and the browser.
* `npm run tes:chromet` - runs unit tests with Chrome.
* `npm run test:phantom` - runs unit tests with PhantomJS.
* `npm run watch` - run all unit tests and watch files for changes
* `npm run watch:chrome` - run all unit tests and watch files for changes with Chrome
* `npm run watch:phantom` - run all unit tests and watch files for changes with PhantomJS
* `npm run bump` - bump version number in `package.json`
* `npm run browser` - runs browser unit tests in the browser.
* `npm run dependencies:check` - shows a list over dependencies with a higher version number then the current one - if any
* `npm run dependencies:upgrade` - automatically upgrade all devDependencies & dependencies, and update package.json

# Browser tests and type checking

The browser spec runner - `./config.runner.html` - can be opened in a browser to run your tests. For it to work, you must first run `gulp browser`. This will set up a watch task that will automatically refresh the tests when your scripts, or the tests, change.

`TSLint` are executed on every change and will make a sound in your speaker if any linting errors.

# Testing environment

This project uses `Mocha` to run your unit tests, it uses Karma as the test runner, it enables the feature that you are able to render your tests to the browser (e.g: Firefox, Chrome etc.).

To add a unit test, simply create a `.js` inside the ~../test/specs/ folder. Karma will pick up on these files automatically, and Mocha and Chai will be available within your unit tests without the need to import them.

To keep watching the common test suites that you are working on, simply do `npm run watch` or `gulp watch`.

# FAQ

### Any plans for `Mocha` tests for the `node.js environment`?

Not atm. Feel free to send a PR.

### Why isn't a sourcemap generated for the bundle?

Because this is not set by default. It's very simple to add it. This boilerplate are using
[`rollup-stream`](https://www.npmjs.com/package/rollup-stream), so simply follow `example #2` in the readme on their Github repo to set it up.

### What's the browser compatibility?

As a rule of thumb, Babel works best in IE9 and above.

### What's the cost of transpiling?

A thorough analysis of this question can be found [here](https://github.com/samccone/The-cost-of-transpiling-es2015-in-2016).

# License

The MIT License (MIT)

Copyright (c) 2016 KFlash

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
