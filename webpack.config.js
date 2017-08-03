/**
 * Created by vpotseluyko on 6/15/17.
 */

const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './javascript'),
    entry: {
        index: [
            //'babel-polyfill', add if better browser support neeeded
            './DOMController.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, './'),
        publicPath: '/',
        filename: "[name].js",
        chunkFilename: "[id].js",
    },
    module: {
        rules: [
            {
                test: /\.js/,
                include: [
                    path.resolve(__dirname, './javascript/')
                ],
                loader: "babel-loader?presets[]=latest"
            },
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"]
    },
    plugins: [
        new UglifyJSPlugin(),
    ]
};