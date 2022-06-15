const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = (env) => merge(common(env), {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].prod.bundle.js',
        path: path.resolve(__dirname, 'prod'),
        publicPath: '/stageHand_php/src/public/assets/'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            // extractComments: false,
            // parallel: true,
            minify: TerserPlugin.esbuildMinify,

            terserOptions: {
                // compress: true,
                // format: {
                //     comments: false
                // }
            },

        })],
    },
});