import path from 'path'
// let Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

// var webpack_isomorphic_tools_plugin =
//   // webpack-isomorphic-tools settings reside in a separate .js file
//   // (because they will be used in the web server code too).
//   new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
//   // also enter development mode since it's a development webpack configuration
//   // (see below for explanation)
//   .development()

/* For loading images and video files */
// {
//   test: webpack_isomorphic_tools_plugin.regular_expression('images'),
//   loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
// }

let sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, './src'),
  'includePaths[]=' + path.resolve(__dirname, './node_modules')
];

sassParams.push('sourceMap', 'sourceMapContents=true');

export let sassLoader = [
  'style-loader',
  'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader',
  'sass-loader?' + sassParams.join('&')
].join('!');

export let cssLoader = [
  'style-loader',
  'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader'
].join('!');

// Not working. These are all things I've tried.
export let vidLoader = [
  // 'file-loader?name=videos/[name].[ext]'
  'url-loader?limit=100000'
  // 'file-loader'
  // 'file'
]