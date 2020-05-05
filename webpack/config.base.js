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
        // exprContextCritical: false,
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                        // options: {
                        //     presets: ['@babel/react']
                        // }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    }
};
