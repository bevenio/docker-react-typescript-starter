const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')

const rootDir = path.resolve(__dirname, './../')
const srcDir = path.resolve(rootDir, './src')
const distDir = path.resolve(rootDir, './dist')

const createEntry = (/* options */) => [path.resolve(srcDir, 'index.jsx')]

const createTarget = (/* options */) => 'web'

const createResolve = (/* options */) => ({
  extensions: ['.js', '.jsx'],
  alias: {
    '@': srcDir,
  },
  fallback: {
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
  },
})

const createOutput = (options) => ({
  filename: 'js/[name].bundle.js',
  chunkFilename: 'js/chunks/[name].chunk.js',
  path: path.resolve(distDir, './'),
  publicPath: options.publicPath,
})

const createPlugins = (options) => {
  const plugins = []

  plugins.push(new CleanWebpackPlugin())

  plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, './index.html'),
    })
  )

  if (options.baseHref) {
    plugins.push(new BaseHrefWebpackPlugin({ baseHref: options.baseHref }))
  }

  plugins.push(new webpack.ids.HashedModuleIdsPlugin())

  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(rootDir, './static'),
          to: path.resolve(distDir, './static/'),
          force: true,
        },
      ],
    })
  )

  plugins.push(
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
    })
  )

  plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  )

  if (options.hmr === true) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (options.showBundleAnalyzer === true) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      })
    )
  }

  return plugins
}

const createModules = (/* options */) => {
  const rules = []

  rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  })

  rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [],
      },
    },
  })

  rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          url: false,
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  })

  rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  })

  rules.push({
    test: /\.(woff|woff2|ttf)$/,
    use: {
      loader: 'url-loader',
    },
  })

  return {
    rules,
  }
}

const createOptimization = (/* options */) => ({
  runtimeChunk: 'single',
  chunkIds: 'named',
  splitChunks: {
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
          return `npm.${packageName.replace('@', '')}`
        },
      },
    },
  },
  minimize: false,
})

const config = (options) => ({
  mode: 'test',
  entry: createEntry(options),
  target: createTarget(options),
  resolve: createResolve(options),
  output: createOutput(options),
  plugins: createPlugins(options),
  module: createModules(options),
  optimization: createOptimization(options),
})

module.exports = config
