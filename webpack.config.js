const path = require('path');

module.exports = (env = {}) => {
  const dev = env.dev

  return {
    mode: dev ? 'development' : 'production',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      filename: dev ? 'axios.js' : 'axios.min.js',
      path: path.join(__dirname, 'dist'),
      sourceMapFilename: dev ? 'axios.map' : 'axios.min.map',
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
      port: 8080,
      hot: true
    }
  }
}