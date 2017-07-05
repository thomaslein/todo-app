/* eslint-disable strict */
'use strict';

const bs = require('browser-sync').create();

const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const proxyMiddleware = require('http-proxy-middleware');

const config = require('./webpack.config');

const compiler = webpack(config);

const host = require('./host');

const server = require('./server')

const options = {
  open: false,
  notify: false,
  scrollThrottle: 50,
  logSnippet: false,
  server: {
    baseDir: 'web',
    middleware: [
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        stats: {
          colors: true,
        },
      }),
      webpackHotMiddleware(compiler),
      (req, res, next) => {
        if (req.url.match(/app\.css$/)) {
          res.setHeader('Content-Type', 'text/css');
          return res.end('');
        }

        next();
      },
    ],
  },
  injectFileTypes: ['css'],
  files: [
    './app/Resources/views/**/*.twig',
    './src/AppBundle/**/*.twig',
  ],
};

if (host) {
  options.server.middleware.push(
    proxyMiddleware('/', {
      target: host,
      changeOrigin: true,
      onProxyReq: function onProxyReq(proxyReq) {
        proxyReq.setHeader('x-browsersync', true);
      },
    })
  );
}

bs.init(options);
