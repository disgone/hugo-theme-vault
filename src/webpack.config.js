/*jshint esversion: 6 */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* Plugins */
const cleanBuild = new CleanWebpackPlugin({
    verbose: true,
    cleanOnceBeforeBuildPatterns: [
        '**/*.css',
        '**/*.js'
    ]
});

const extractCSS = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
});

/* Config */
const config = {
    entry: {
        main: path.join(__dirname, "js", "main.js")
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../assets')
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer({})
                            ]
                        }
                    }
                },
                'less-loader'
            ]
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.less']
    },
    plugins: [
        cleanBuild,
        extractCSS
    ]
};

module.exports = config;
