const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = require('./src/config.json');

const baseHref = config.BASE_HREF.slice(0, -1);

const devConfig = {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ForkTsCheckerWebpackPlugin()
    ],
    devServer: {
        inline: false,
        port: 8080,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://localhost:1280",
                pathRewrite: { '^/api': '' }
            }
        },
        allowedHosts: [
            '.localhost'
        ]
    },
    mode: 'development'
};

if (baseHref) {
    devConfig.devServer.proxy[baseHref] = {
        target: "http://localhost:8080",
        pathRewrite: { [`^${baseHref}`]: '' }
    };
}

module.exports = merge(common, devConfig);
