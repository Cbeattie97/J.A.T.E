const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Workbox plugins for a service worker and manifest file have been added and configured.

// CSS loaders and babel have been added to webpack.


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: './index.html',
      title: 'J.A.T.E.'
      }),

      new InjectManifest({
        swSrc: './src/js/service-worker.js',
        swDest: 'service-worker.js',
      }),

      new WebpackPwaManifest({
        name: 'J.A.T.E.',
        short_name: 'J.A.T.E.',
        description: 'Just Another Text Editor',
        background_color: '#0D0208',
        theme_color: '#008F11',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/assets/icons/icon-192x192.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread'],
            }
          }
        },
      ],
     }
  };
};
