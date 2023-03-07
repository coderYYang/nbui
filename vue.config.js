const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: process.env.NODE_ENV === 'development' ? 'dist_test' : 'dist',
  publicPath: './'
})
