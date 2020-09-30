const { mergeWithCustomize, customizeArray } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const productionConfig = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimizer: [new TerserPlugin({
            parallel: true
        })]
    },
    mode: 'production'
};

module.exports = mergeWithCustomize({
    customizeArray: customizeArray({ 'module.rules': 'prepend' })
})(common, productionConfig);
