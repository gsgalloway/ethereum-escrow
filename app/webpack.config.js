var fs = require("fs");
var path = require('path');
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var environment = process.env.NODE_ENV || "development";

var provided = {
  "Web3": "web3",
  "Pudding": "ether-pudding",
  "Promise": "bluebird"
};

// Get all the compiled contracts for our environment.
var contracts_directory = path.join(".", "build", "contracts");
fs.readdirSync(contracts_directory).forEach(function(file) {
  if (path.basename(file).indexOf(".sol.js")) {
    provided[path.basename(file, ".sol.js")] = path.resolve(contracts_directory + "/" + file);
  }
});

module.exports = {
  entry: {
    app: './src/javascript/index.jsx',
    test: './test/index.js',
  },
  output: {
    path: "./build",
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.(js|jsx|es6)$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.scss$/i, loader: ExtractTextPlugin.extract(["css", "sass"])},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.json$/i, loader: "json"}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        ENV: '"' + process.env.NODE_ENV + '"',
        WEB3_PROVIDER_LOCATION: '"' + process.env.WEB3_PROVIDER_LOCATION + '"'
    }),
    new webpack.ProvidePlugin(provided),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: "index.html" },
      { from: './src/images', to: "images" },
    ]),
    new ExtractTextPlugin("app.css"),
  ],
  resolve: {
    fallback: path.join(__dirname, "node_modules"),
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    fallback: path.join(__dirname, "node_modules"),
    extensions: ["", ".js", ".jsx"]
  }
};
