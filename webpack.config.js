/**
 *
 */

const path = require("path");
const BuildHashPlugin = require("build-hash-webpack-plugin");

/**
 *
 */

module.exports = {
    /**
     * entry.
     */

    entry: path.resolve(__dirname, "src/ts/index.ts"),

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

    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    /**
     * plugins.
     */

    plugins: [new BuildHashPlugin({ filename: "build-hash.json" })],

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
};
