const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./wp-base-config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const clientConfig = {
    mode: 'development',
    entry: {
        hangman: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ],
    devtool: 'inline-source-map'
}
module.exports = merge(baseConfig, clientConfig)