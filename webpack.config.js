/*jshint esversion: 6 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

/* Plugins */
const cleanBuild = new CleanWebpackPlugin({
    verbose: true,
    cleanOnceBeforeBuildPatterns: [
        '*.css',
        '*.js',
        '/fonts'
    ]
});

const extractCSS = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
});

/* Config */
module.exports = (env) => {
    const isProduction = env && env.production;

    return {
        entry: {
            main: path.join(__dirname, "./assets/js/main.js"),
            syntax: path.join(__dirname, "./assets/js/syntax.js"),
        },
        mode: isProduction ? 'production' : 'development',
        output: {
            filename: '[name].js',
            path: path.join(__dirname, './assets'),
            assetModuleFilename: 'fonts/[name][ext][query]',
            publicPath: '/'
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        module: {
            rules: [
                {
                    test: /static\/fonts\/\.(woff2?)$/,
                    type: 'asset/resource',
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
                        'less-loader'
                    ]
                }
            ]
        },
        plugins: [
            cleanBuild,
            extractCSS
        ]
    }
}