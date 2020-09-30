const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const config = require('./src/config.json');

module.exports = {
    entry: {
        newProject: './src/main.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            maxAsyncRequests: Infinity,
            minSize: 0,
        },
    },
    module: {
        rules: [
            {
                test: /\.[t|j]sx?$/,
                include: /(src)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env',
                            {
                                "useBuiltIns": "usage",
                                "corejs": 3
                            }]],
                        plugins: ['@babel/plugin-syntax-dynamic-import']
                    }
                }]
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        alias: {
            css: path.resolve(__dirname, 'css/')
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            templateParameters: config,
            chunks: ['vendors~newProject', 'newProject'],
            chunksSortMode: 'manual',
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './css/*' },
                { from: './img/*' },
            ]
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr/),
    ]
};
