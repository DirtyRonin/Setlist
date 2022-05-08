const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8000,
        progress: true,
        watchContentBase: true,
        publicPath: '/',
        watchOptions: {
            poll: 1000,
            ignored: '**/node_modules',
            aggregateTimeout: 600,
        },
    }
});