const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const path = require('path')

const rootDir = path.resolve(__dirname, './../')
const srcDir = path.resolve(rootDir, './src')
const distDir = path.resolve(rootDir, './dist')

const extractChunkName = (pathData) => {
  const chunkId = pathData.chunk.id.replace('_jsx', '')
  const chunkPathParts = chunkId.split('_')
  if (chunkPathParts[chunkPathParts.length - 1] === 'index') {
    return `js/chunks/${chunkPathParts[chunkPathParts.length - 2]}.chunk.js`
  } else {
    return `js/chunks/${chunkPathParts[chunkPathParts.length - 1]}.chunk.js`
  }
}

const createEntry = (/* options */) => ['react-hot-loader/patch', path.resolve(srcDir, 'index.jsx')]

const createTarget = (/* options */) => 'web'

const createResolve = (/* options */) => ({
  extensions: ['.js', '.jsx'],
  alias: {
    '@': srcDir,
    'react-dom': '@hot-loader/react-dom',
  },
  fallback: {
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
  },
})

const createOutput = (options) => ({
  filename: 'js/[name].bundle.js',
  chunkFilename: (pathData) => {
    return extractChunkName(pathData)
  },
  path: path.resolve(distDir, './'),
  publicPath: options.publicPath,
})

const createDevServer = (options) => ({
  host: '0.0.0.0',
  port: options.port,
  contentBase: distDir,
  compress: false,
  hot: true,
  watchContentBase: true,
  historyApiFallback: true,
  open: true,
  openPage: '.',
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

  if (options.sw === true) {
    plugins.push(
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        mode: options.mode,
        swDest: './static/pwa/service-worker.js',
      })
    )
  }

  if (options.hmr === true) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (options.compress === true) {
    plugins.push(
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/,
      })
    )
  }

  if (options.showBundleAnalyzer === true) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        port: options.port,
        reportFilename: 'bundle-analyzer.html',
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

  rules.push({
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    use: ['source-map-loader'],
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
  mode: options.mode,
  entry: createEntry(options),
  target: createTarget(options),
  resolve: createResolve(options),
  output: createOutput(options),
  devServer: createDevServer(options),
  plugins: createPlugins(options),
  module: createModules(options),
  optimization: createOptimization(options),
})

module.exports = config
