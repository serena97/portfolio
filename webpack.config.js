const path = require('path');

module.exports = {
  entry: './src/scripts/art.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'art.js',
    path: path.resolve(__dirname, 'src/scripts'),
  }
};