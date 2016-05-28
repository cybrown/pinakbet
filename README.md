### Pinakbet

[![Build Status](https://travis-ci.org/Kflash/pinakbet.svg?branch=master)](https://travis-ci.org/Kflash/pinakbet)

> A starter kit to get you up and running with TypeScript, using Bublé as the ES2015 compiler

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
* `npm run lint:src` - lint the source
* `npm run lint:tests` - lint the unit tests
* `npm run test` - runs unit tests for both node and the browser.
* `npm run tes:chromet` - runs unit tests with Chrome.
* `npm run test:phantom` - runs unit tests with PhantomJS.
* `npm run watch` - run all unit tests and watch files for changes
* `npm run watch:chrome` - run all unit tests and watch files for changes with Chrome
* `npm run watch:phantom` - run all unit tests and watch files for changes with PhantomJS
* `npm run dependencies:check` - shows a list over dependencies with a higher version number then the current one - if any
* `npm run dependencies:upgrade` - automatically upgrade all devDependencies & dependencies, and update package.json
