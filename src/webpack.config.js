const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const fontMagician = require('postcss-font-magician');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const define = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
});

/* Plugins */
const cleanBuild = new CleanPlugin([
    '../static/css/*',
    '../static/js/*'
], {
    allowExternal: true,
    verbose: true
});

const extractCSS = new ExtractTextPlugin({
    filename: getPath =>
        getPath('css/[name].[contenthash].css').replace('css', '../css')
});

/* Config */
const config = {
    entry: {
        main: path.join(__dirname, "js", "main.js")
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../static', 'js')
    },
    module: {
        rules: [{
            test: /\.less$/,
            include: path.resolve(__dirname, 'css'),
            loader: extractCSS.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['> 1%', 'last 2 versions']
                            }),
                            fontMagician({
                                foundries: ['google'],
                                display: 'swap'
                            })
                        ]
                    }
                },
                {
                    loader: 'less-loader'
                }]
            })
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.less']
    },
    plugins: [
        define,
        cleanBuild,
        extractCSS
    ]
}

module.exports = config;
