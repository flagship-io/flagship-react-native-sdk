const merge = require('webpack-merge');
const baseConfig = require('./config.base.js');

module.exports = merge(baseConfig, {
    target: 'web',
    output: {
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    externals: {
        'react-native': 'react-native'
    }
});
