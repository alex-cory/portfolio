import Webpack_isomorphic_tools_plugin from 'webpack-isomorphic-tools/plugin'

module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg']
    },
    videos: {
      extensions: [ 'webm', 'mp4' ]
      //, parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
  }
}