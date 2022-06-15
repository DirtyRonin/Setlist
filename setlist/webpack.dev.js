const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = (env) => merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: '/' //'/stageHand_php/src/public/assets/'
    },
    devServer: {
        historyApiFallback: true,
        static: path.join(__dirname, "build"),
        compress: true,
        port: 8000,
        client: {
            logging: 'info',
            progress: true,
            overlay: {
                warnings: false,
                errors: true
            }
        },
        

        // static: './dist',
        // historyApiFallback: true,
        // contentBase: path.resolve(__dirname, 'dist'),
        // compress: true,
        // port: 8000,
        // progress: true,

        // watchContentBase: true,
        // publicPath: '/',
    },
    watchOptions: {
        poll: 1000,
        ignored: '**/node_modules',
        aggregateTimeout: 600,
    },
});