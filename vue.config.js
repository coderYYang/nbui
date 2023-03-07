const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: process.env.NODE_ENV === 'development' ? 'dist_test' : 'dist',
  publicPath: './',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: (config) => {
    config.module.rule('js').include.add('/packages').end().use('babel').loader('babel-loader')
  }
})
