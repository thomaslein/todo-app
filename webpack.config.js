/* eslint-disable strict, max-len, global-require */

'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('./lib/interpolate-html-plugin');

const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

const dev = process.env.NODE_ENV === 'development';
const production = process.env.NODE_ENV === 'production';

const config = {
  devtool: dev ? 'cheap-source-map' : undefined,

  entry: {
    // Entry point for the application.
    app: [
      // Entry point for your project. This is the main file that handles all
      // imports for the entire project.
      path.resolve(__dirname, 'src', 'entry.js'),
    ].concat(dev
      ? [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true',
      ]
      : []
    ),
  },

  devServer: {
		proxy: {
			"*": "http://localhost:8080",
		},
	},
  output: {
    // Output destination.
    path: path.resolve(__dirname, 'web'),
    // This adds / in the url to the files that are passed through webpack.
    publicPath: '/',
    // Output filename. Hashing in production for cache busting.
    filename: `scripts/${production ? '[chunkhash:8]' : '[name]'}.js`,
    chunkFilename: `scripts/${production ? '[chunkhash:8]' : '[name]'}.js`,
  },

  resolve: {
    modules: [
      // These paths are treated as module roots. Which enables you to import
      // files from here without the ../../../ hell.
      // e.g. import Module from 'Module'; will make webpack look for the module in
      // src/scripts/Module.js, if it doesnt find it, it will look in styles
      // and then finally in node_modules.
      path.resolve(__dirname, 'lib'),
      path.resolve(__dirname, 'src', 'scripts'),
      path.resolve(__dirname, 'src', 'styles'),
      path.resolve(__dirname, 'src', 'media'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
    // This section is useful for aliasing modules which aren't directly available for import.
    // e.g. TweenLite: path.resolve(__dirname, 'node_modules', 'gsap', 'src', 'uncompressed', 'TweenLite.js'),
    // will make it possible to do: import TweenLite from 'TweenLite'; within your scripts.
    alias: {},
  },

  resolveLoader: {
    moduleExtensions: ['-loader'],
    modules: ['lib', 'node_modules'],
  },

  module: {
    // Loaders are triggered when an imported file matches a pattern
    // and then process that file according to the loader specified.
    rules: [
      {
        // Parse imported .json files as javascript objects.
        test: /\.json$/,
        loader: 'json',
        exclude: /(node_modules)/,
      },
      {
        // Parse JSX with babel.
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
      },
      {
        // Copy font files and update file reference if name is hashed.
        test: /\.(woff|woff2|png|jpg|jpeg|svg|gif|mp4|webm|ogg|mp3|m4a)$/,
        loader: 'file',
        query: {
          limit: 10000,
          name: `media/${production ? '[hash:8]' : '[name]'}.[ext]`,
        },
        exclude: /fb-share/,
      },
      {
        // Copy, but dont hash facebook share image.
        test: /\.(jpg|png)$/,
        loader: 'file',
        query: {
          limit: 10000,
          name: '[name].[ext]',
        },
        include: /fb-share/,
      },
      {
       // Process sass and extract it to a separate file in production.
       test: /\.scss$/,
       loader: dev
         ? 'style!css!postcss!sass'
         : ExtractTextPlugin.extract({
             fallback: 'style',
             use: 'css!postcss!sass',
           }),
       },

      {
        test: /\.yml$/,
        loader: 'ensure-require!json!yaml',
        exclude: /(node_modules)/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, 'src', 'templates', 'index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: false,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // These values are interpolated in the HTML using %var% syntax.
    new InterpolateHtmlPlugin({
      HOST_NAME: dev ? 'http://localhost:3000' : '',
      TITLE: 'Eggs - Todo',
    }),
    // Copy files with webpack.
    new CopyWebpackPlugin([
      {
        from: 'src/static',
      },
    ]),
    // Add shims/polyfills etc here. These will only be included in the output if
    // they're used within your code, otherwise they will be ignored.
    // Read more about import/export loaders here: https://webpack.github.io/docs/shimming-modules.html
    new webpack.ProvidePlugin({
      // Promise: 'exports?global.Promise!es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    // In webpack 2.0 loaders cannot add options at the root of the config object.
    // They are passed here to the LoaderOptionsPlugin. This step is also setting minimize/debug.
    new webpack.LoaderOptionsPlugin({
      minimize: !dev,
      debug: dev,
      options: {
        context: __dirname,
        sassLoader: {
          // Options for sass processing.
          outputStyle: 'expanded',
          includePaths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src', 'styles'),
          ],
        },
        postcss: [
          // Options for postcss. This adds vendor prefixes and compresses sass in production.
          // Possible to add more postcss plugins here if neccessary.
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9',
            ],
          }),
        ].concat(dev
          ? []
          : [csswring({ removeAllComments: true })]
        ),
      },
    }),
    // Splits code into vendor and app files. This is useful because code that
    // doesn't change frequently will be cached and returning users will only
    // have to download a smaller file (app.js) to get the updated code.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: module => /(node_modules|lib)/.test(module.resource),
    // }),
    // In order to keep the module order intact with the vendor/app files, we need
    // to create an index file called manifest that operates as a lookup for your
    // imports.
    // new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  ].concat(dev ? [
    // Define dev specific options. Will make process.env.NODE_ENV equal to 'dev'
    // within your code to include dev specific code. Code within a dev condition
    // will be omitted in production.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    // Define production specific options.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        drop_console: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false,
        screw_ie8: true,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin(`styles/${production ? '[contenthash:8]' : '[name]'}.css`),
  ]),
};

module.exports = config;
