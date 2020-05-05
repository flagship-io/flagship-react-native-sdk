// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        app: './index.js'
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        library: 'flagship',
        libraryExport: 'default'
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react']
                        }
                    }
                    // {
                    //     loader: 'eslint-loader',
                    //     // query: {
                    //     //     presets: ['es2015', 'react']
                    //     // },
                    //     options: {
                    //         cache: true,
                    //         emitWarning: true,
                    //         configFile: '.eslintrc.js'
                    //     }
                    // }
                ]
            }
        ]
    },
    externals: [
        nodeExternals({
            whitelist: ['axios']
        })
    ],
    plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    }
};
