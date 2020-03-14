const path = require('path');

module.exports = (env = {}) => {
  const dev = env.dev

  return {
    mode: dev ? 'development' : 'production',
    entry: ['@babel/polyfill',path.join(__dirname, 'src/index.js')],
    output: {
      filename: dev ? 'axios.js' : 'axios.min.js',
      //path是相对文件的绝对路径，和output.publicPath、devServer.publicPath之间没有关系
      path: path.join(__dirname, 'dist'),
      sourceMapFilename: dev ? 'axios.map' : 'axios.min.map',
      //output.publicPath仅仅对output打包后的文件中，使用“/”的静态路径有作用，打包时对这些静态路径进行动态合并
      // publicPath:'/dist/'
    },
    devtool: 'source-map',
    module:{
      rules:[
        {
          test:/\.js$/,
          exclude:[path.resolve(__dirname,'node_modules')],
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env']
            }
          }
        }
      ]
    },
    devServer: {
      port: 8000,
      hot: true,
      //devServer.publicPath将指定服务在内存中的根目录
      // publicPath:'/dist/'
    }
  }
}