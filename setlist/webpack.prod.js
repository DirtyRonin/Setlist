const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports=(env) => merge(common(env), {
    mode: 'production',
    devtool:'source-map',
    output: {
        filename: '[name].prod.bundle.js',
        path: path.resolve(__dirname, 'prod'),
        publicPath: '/stageHand_php/src/public/assets/'
    },
});