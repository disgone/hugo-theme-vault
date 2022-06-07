/*jshint esversion: 6 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* Plugins */
const cleanBuild = new CleanWebpackPlugin({
    verbose: true,
    cleanOnceBeforeBuildPatterns: [
        '*.css',
        '*.js'
    ]
});

const extractCSS = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
});

/* Config */
const config = {
    entry: {
        main: path.join(__dirname, "./assets/js/main.js")
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './assets')
    },
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                type: 'asset/resource'
            },
            {
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
                    {
                        loader: 'less-loader',
                        options: {}
                    }
                ]
            }
        ]
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
