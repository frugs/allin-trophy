const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "public"
      }
    ]),
    new CleanWebpackPlugin(["dist"])
  ]
};
