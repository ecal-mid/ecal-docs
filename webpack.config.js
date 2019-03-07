const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const root = path.join(__dirname);
const nodeModules = path.join(root, '/node_modules/');

module.exports = {
    mode: 'production',
    entry: {
        main: ['./src/main.js', './src/main.scss'],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[name].js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                include: [
                    path.join(nodeModules, '@material')
                ],
                options: {
                    cacheDirectory: true
                }
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules']
                        }
                    }
                ]
            }, 
            {
                test: /\.html$/,
                loader: 'mustache-loader'
                // loader: 'mustache-loader?minify'
                // loader: 'mustache-loader?{ minify: { removeComments: false } }'
                // loader: 'mustache-loader?noShortcut'
            }
        ]
    },
    plugins: [
        // todo add back / crete dev / production profiles
        // new CleanWebpackPlugin(['dist'], {}),
        new MiniCssExtractPlugin({filename: 'bundle-[name].css'}),
        new HtmlWebpackPlugin({inject: false, hash: true, template: './src/index.html', filename: 'index.html'}),
        new CopyWebpackPlugin([
            {
                from: 'src/assets',
                to: 'assets'
            }
        ], {})
    ]
}