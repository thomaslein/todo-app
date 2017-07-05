# To Do App Example

A MVC example project with NodeJS and MongoDB backend serving pure vanilla js as frontend.

[![node](https://img.shields.io/badge/node-v8.1.1-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/npm-v5.0.3-brightgreen.svg)]()
[![eslint](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

## Installation
If you've never used NodeJS, MongoDB or Yarn before, you'll need to install them.
If you use homebrew, just run:

```
brew install node
brew install mongodb
brew install yarn
```

Otherwise, you can download and install them manually

[Download NodeJS here](http://nodejs.org/download/)

[Download MongoDB here](https://docs.mongodb.com/manual/installation/)

[Download Yarn here](https://yarnpkg.com/en/docs/install).

### Install dependencies
```
yarn
```

This runs through all dependencies listed in `yarn.lock` and installs them locally within the project.

### Running development scripts
```
mongod

yarn dev
```

This will start mongoDB server and compile your assets and serve them over browser-sync with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware), proxied through the domain specified in host.js.


#### Localhost for development

```
http://localhost:3000
```

#### Backend proxy

```
http://localhost:8080
```

### Running build scripts
```
yarn build
```
This will build without minify and hashing assets.

### Building for production
```
yarn production
```
This will minify and hash all assets etc.

### Testing with Jest
This repo includes a test suite running [Jest](https://facebook.github.io/jest/).

To run the tests simply run:
```
yarn test
```

### Code style
This repo follows the [airbnb](https://github.com/airbnb/javascript) javascript coding style guide. It also includes some default editor settings using [editor config](https://github.com/sindresorhus/editorconfig-sublime).
