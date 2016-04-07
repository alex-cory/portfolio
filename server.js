import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {Schema} from './src/data/schema';
// var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
var graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));



// var webpack_isomorphic_tools_plugin =
//   // webpack-isomorphic-tools settings reside in a separate .js file
//   // (because they will be used in the web server code too).
//   new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
//   // also enter development mode since it's a development webpack configuration
//   // (see below for explanation)
//   .development()

// Serve the Relay app
var compiler = webpack({
  context: __dirname + '/src',
  entry: path.resolve(__dirname, 'src', 'app.jsx'),
  output: {
    filename: 'app.js',
    path: '/',
    publicPath: '/'
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
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$|.mp4$/,
        loader: 'url-loader?limit=8192'
        // loader: 'file-loader?name=images/[name].[ext]'
      },
      /* For loading images and video files */
      // {
      //   test: webpack_isomorphic_tools_plugin.regular_expression('images'),
      //   loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
      // }
    ]
  },
  resolve: {
    moduleDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.json', '.jsx']
  },
  // plugins: [
  //   webpack_isomorphic_tools_plugin
  // ]
});
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/src/',
  stats: {colors: true}
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
