import express from 'express'
import graphQLHTTP from 'express-graphql'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import BowerWebpackPlugin from 'bower-webpack-plugin'

import { Schema } from './src/data/schema'
// let Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
let graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

let sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, './src'),
  'includePaths[]=' + path.resolve(__dirname, './node_modules')
];

sassParams.push('sourceMap', 'sourceMapContents=true');

let sassLoader = [
  'style-loader',
  'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader',
  'sass-loader?' + sassParams.join('&')
].join('!');

let cssLoader = [
  'style-loader',
  'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader'
].join('!');


// let webpack_isomorphic_tools_plugin =
//   // webpack-isomorphic-tools settings reside in a separate .js file
//   // (because they will be used in the web server code too).
//   new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
//   // also enter development mode since it's a development webpack configuration
//   // (see below for explanation)
//   .development()

// Serve the Relay app
let compiler = webpack({
  devtool: "eval-source-map",
  context: __dirname + '/',
  entry: path.resolve(__dirname, 'src', 'app.jsx'),
  output: {
    filename: 'app.js',
    path: '/public',            // webpack-dev-server will serve the static files from here. It’ll watch your source files for changes and when changes are made the bundle will be recompiled.
    publicPath: './'            // This modified bundle is served from memory at the relative path specified here.  It will not be written to your configured output directory.
  },
  module: {
    loaders: [
      {
        test: /.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      /* For Loading Images in CSS/SCSS Files */
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader'
      },
      /* Compiles css -> js */
      {
        test: /\.css$/,
        loader: cssLoader
      },
      /* Compiles sass -> css -> js */
      {
        test: /\.scss$/,
        loader: sassLoader
      },
      /* DOESN'T WORK :( */
      {
        test: /\.(webm|mp4|mov|mpeg|avi|m4v|ogg)$/,
        // loader: 'file-loader?name=videos/[name].[ext]'
        loader: 'url-loader?limit=100000'
        // loader: 'file-loader'
        // loader: 'file'
      },
      /* For loading images and video files */
      // {
      //   test: webpack_isomorphic_tools_plugin.regular_expression('images'),
      //   loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
      // }
    ]
  },
  resolve: {
    moduleDirectories: ['node_modules', './src', 'public', 'bower_components'],
    extensions: ['', '.js', '.json', '.jsx']
  },
  plugins: [
    // webpack_isomorphic_tools_plugin
    new webpack.ProvidePlugin({
        // Makes the keys (i.e. $, _, classNames, etc.) available in any module
        $:          'jquery',
        jQuery:     'jquery',
        _:          'lodash',
        classNames: 'classnames',
        my:         path.resolve(__dirname, 'config/config.js')
    }),
    // new HtmlWebpackPlugin()
    // Supposed to load bower assets
    // new webpack.ResolverPlugin(
    //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    // )
    // new BowerWebpackPlugin()
  ]
});
let app = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, 'public'),//'/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/src/',
  stats: {colors: true},
  inline: true,
  historyApiFallback: true
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});