const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
      splitChunks: {
        chunks: 'all'
      }
    }
  
    if (isProd) {
      config.minimizer = [
        new OptimizeCssAssetWebpackPlugin(),
        new TerserWebpackPlugin()
      ]
    }
  
    return config
  }

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const cssLoaders = extra => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: isDev,
          reloadAll: true
        },
      },
      'css-loader'
    ]
  
    if (extra) {
      loaders.push(extra)
    }
  
    return loaders
  }
  
const babelOptions = preset => {
    const opts = {
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
    }
  
    if (preset) {
      opts.presets.push(preset)
    }
  
    return opts
  }
  
  
const jsLoaders = () => {
    const loaders = [{
      loader: 'babel-loader',
      options: babelOptions()
    }]
  
    if (isDev) {
      loaders.push('eslint-loader')
    }
  
    return loaders
  }
  
const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new CleanWebpackPlugin(),
    //   new CopyWebpackPlugin([
    //     {
    //       from: path.resolve(__dirname, 'src/favicon.ico'),
    //       to: path.resolve(__dirname, 'dist')
    //     }
    //   ]),
      new MiniCssExtractPlugin({
        filename: filename('css')
      })
    ]
  
    if (isProd) {
      base.push(new BundleAnalyzerPlugin())
    }
  
    return base
  }

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // mode: 'development',
    entry: path.resolve(__dirname, 'src/components/script.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    // resolve: {
    //     extensions: ['.js', '.json', '.png'],
    //     alias: {
    //       '@models': path.resolve(__dirname, 'src/models'),
    //       '@': path.resolve(__dirname, 'src'),
    //     }
    //   },
    optimization: optimization(),
    devServer: {
        port: 8080,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            { // тут описываются правила
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: 'babel-loader', // весь JS обрабатывается пакетом babel-loader
                exclude: /node_modules/ // исключает папку node_modules
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(jpg|jpeg|png|svg|webp)$/,
                use: 'file-loader?name=./images/[name].[ext]&esModule=false'
            }
        ]
    },
    // plugins: [
    //     new CleanWebpackPlugin(),
    //     new HtmlWebpackPlugin({
    //         template: './index.html'
    //     }),
    //     new MiniCssExtractPlugin({
    //         filename: '[name].[contenthash].css'
    //     }),
    //     new WebpackMd5Hash(),
    // ]
};