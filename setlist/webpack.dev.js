const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = (env)=> merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].dev.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './' //'/stageHand_php/src/public/assets/'
    },
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