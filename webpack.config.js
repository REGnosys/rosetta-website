/**
 *
 */

const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

/**
 *
 */

module.exports = {
  /**
   * entry.
   */

  entry: "./src/ts/index.ts",

  /**
   * output.
   */

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "web/assets/js"),
  },

  /**
   * resolve.
   */

  resolve: {
    extensions: [".ts", ".js"],
  },

  /**
   * devtool.
   */

  devtool: "source-map",

  /**
   * mode.
   */

  mode: "development",

  /**
   * module.
   */

  module: {
    /**
     * rules.
     */

    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  /**
   * plugins.
   */

  plugins: [
    new HandlebarsPlugin({
      data: require("./web/assets/config"),
      partials: [path.join(process.cwd(), "src", "views", "partials", "*.hbs")],
      entry: path.join(process.cwd(), "src", "views", "*.hbs"),
      output: path.join(process.cwd(), "web", "[name].html"),
    }),
  ],
};
