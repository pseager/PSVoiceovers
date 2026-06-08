const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/main.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
      clean: true,
      // Relative paths work on both github.io/PSVoiceovers/ and psvoiceovers.com
      publicPath: isProduction ? './' : '/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: [
            isProduction
              ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '../' },
                }
              : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.mp3$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'public', to: '.', noErrorOnMissing: true }],
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: isProduction
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
            }
          : false,
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: 'css/[name].[contenthash:8].css',
            }),
          ]
        : []),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      port: 5173,
      hot: true,
      open: false,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    performance: {
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 3 * 1024 * 1024,
    },
  };
};
