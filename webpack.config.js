const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: path.resolve(__dirname, 'src/components/script.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            { // тут описываются правила
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: 'babel-loader', // весь JS обрабатывается пакетом babel-loader
                exclude: /node_modules/ // исключает папку node_modules
            },
            {
                test: /\.css$/i,
                use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 
                    {
                        loader:'css-loader',
                        options: {
                            importLoaders: 2
                        }                    

                    },
                    'postcss-loader']
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './vendor/fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(jpg|jpeg|png|svg|webp)$/,
                use: [
                    'file-loader?name=./images/[name].[ext]&esModule=false',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                              progressive: true,
                              quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                              enabled: true,
                            },
                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {
                              interlaced: true,
                            },
                            // the webp option will enable WEBP
                            webp: {
                              quality: 75
                            }
                          }
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new WebpackMd5Hash(),
        new OptimizeCssAssetsPlugin ({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true


        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};