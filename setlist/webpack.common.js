const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists

module.exports = (env) => {

    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        entry: {
            app: ['./src/index.tsx'],
            vendor: ['react', 'react-dom']
        },
        // output: {
        //     filename: '[name].bundle.js',
        //     path: path.resolve(__dirname, 'dist'),
        //     publicPath: './' //'/stageHand_php/src/public/assets/'
        // },
        // devtool: 'source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                src: path.resolve(__dirname, 'src/'),
                api: path.resolve(__dirname, 'src/api/'),
                assets: path.resolve(__dirname, 'src/assets/'),
                components: path.resolve(__dirname, 'src/components/'),
                configuration: path.resolve(__dirname, 'src/configuration/'),
                mapping: path.resolve(__dirname, 'src/mapping/'),
                models: path.resolve(__dirname, 'src/models/'),
                resource: path.resolve(__dirname, 'src/resource/'),
                service: path.resolve(__dirname, 'src/service/'),
                styles: path.resolve(__dirname, 'src/styles/'),
                store: path.resolve(__dirname, 'src/store/'),
                utils: path.resolve(__dirname, 'src/utils/'),
            }
        },
        target: 'web',
        // devServer: {
        //     historyApiFallback: true,
        //     contentBase: path.resolve(__dirname, 'dist'),
        //     compress: true,
        //     port: 8000,
        //     progress: true,
        //     watchContentBase: true,
        //     publicPath: '/',
        //     watchOptions: {
        //         poll: 1000,
        //         ignored: '**/node_modules',
        //         aggregateTimeout: 600,
        //     },
        // },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.(sass|less|css)$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif|ico)$/,
                    use: ['file-loader?name=[name].[ext]']
                },
                {
                    test: /\.m?js/,
                    resolve: {
                        fullySpecified: false
                    }
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'StageHand',
                template: './public/index.html',
                filename: 'index.html',
                favicon: './public/favicon.ico',
                hash: true, // This is useful for cache busting,
            }),
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin(envKeys)
        ]
    }
};