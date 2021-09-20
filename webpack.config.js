/**
 * 
 */

const path = require('path');

/**
 * 
 */

module.exports = {

    /**
     * entry.
     */

    entry: './src/ts/index.ts',

    /**
     * output.
     */

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'web/assets/js')
    },

    /**
     * resolve.
     */

    resolve: {
        extensions: ['.ts', '.js'],
    },

    /**
     * devtool.
     */

    devtool: 'source-map',

    /**
     * mode.
     */

    mode: 'development',

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
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]

    }

};
