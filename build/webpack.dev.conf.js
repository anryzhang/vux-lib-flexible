var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    proxy: {
      "/service/**": "http://121.40.57.9/",
      // "/service/*": "http://app.yunejian.com/",
      // "/service/*": "http://121.40.57.9",    //李志龙
      // "/__/*": "http://localhost:8083",    //李志龙
      // "**/*.xlsx": "http://localhost:8083",    //李志龙
      // "**/*.docx": "http://localhost:8083",    //李志龙
      // "/service/*": "http://10.200.1.87:8080/yunejian-tb-server/",  //刘天琪
      "/ufile/*": "http://121.40.57.9/",
      "/file/*": "http://121.40.57.9/"
      // "/file/*": "http://localhost:8083"
    },
    hot: true,
    inline: true,
    historyApiFallback:true
  }
})
