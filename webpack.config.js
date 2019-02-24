const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyPlugin = require(`copy-webpack-plugin`);
const webpack = require(`webpack`);
const CleanWebpackPlugin = require(`clean-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`)
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `build`),
    publicPath: `http:!/localhost:8080/`,
    inline: true,
    hot: true,
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`
    }),
    // new CleanWebpackPlugin(`build`),
    new CopyPlugin([
      {from: `public/css`, to: `css`},
      {from: `public/images`, to: `images`},
      {from: `public/index.html`, to: `index.html`}
    ]),
    new webpack.HotModuleReplacementPlugin()

  ]

};
