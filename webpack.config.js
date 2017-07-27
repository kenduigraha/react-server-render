var path = require('path');

module.exports = {
  entry: './src/client/app.jsx',

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public/javascripts/')
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  }
};
