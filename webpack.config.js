const path = require("path");

module.exports = {
  output: {
    filename: "[name].pack.js",
    // emit bundles to project root (index.pack.js in repo root)
    path: path.resolve(__dirname, "."),
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {},
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            // Resolve presets explicitly to avoid ambiguous package name resolution
            presets: [
              require.resolve("@babel/preset-env"),
              [
                require.resolve("@babel/preset-react"),
                { runtime: "automatic" },
              ],
            ],
          },
        },
        exclude: /node_modules/,
        test: /\.jsx?$/,
      },
    ],
  },
  entry: {
    index: "./index.js",
  },
};
