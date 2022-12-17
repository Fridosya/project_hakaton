const fs = require('fs')
const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 8080,
    https: {
      key: fs.readFileSync('../.certs/localhost.key'),
      cert: fs.readFileSync('../.certs/localhost.crt')
    },
    hot: 'only'
  },
})
