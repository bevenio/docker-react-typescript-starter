const chalk = require('chalk')
const environment = process.env.NODE_ENV || 'production'
const mode = process.env.MODE || 'web'

const optionPresets = {
  development: {
    entryFile: 'index.jsx',
    targetType: 'web',
    host: '0.0.0.0',
    port: '8080',
    showBundleAnalyzer: false,
    sourceMap: true,
    beautify: true,
    comments: true,
    publicPath: '/',
    baseHref: '/',
  },
  production: {
    entryFile: 'index.jsx',
    targetType: 'web',
    host: '0.0.0.0',
    port: '8080',
    showBundleAnalyzer: false,
    sourceMap: false,
    beautify: false,
    comments: false,
    publicPath: '/',
    baseHref: '/',
  },
  test: {
    entryFile: 'index.jsx',
    targetType: 'web',
    host: '0.0.0.0',
    port: '8080',
    showBundleAnalyzer: false,
    sourceMap: false,
    beautify: false,
    comments: false,
    publicPath: '/',
    baseHref: '/',
  },
}

const options = {
  // Development options
  'development-web': optionPresets.development,
  'development-file': {
    ...optionPresets.development,
    publicPath: undefined,
    baseHref: './',
  },
  // Production options
  'production-web': optionPresets.production,
  'production-file': {
    ...optionPresets.production,
    publicPath: undefined,
    baseHref: './',
  },
  // Test options
  'test-web': optionPresets.test,
  'test-file': {
    ...optionPresets.test,
    publicPath: undefined,
    baseHref: './',
  },
}

console.log(
  `Webpack: ${chalk.blueBright(environment)}, ${chalk.blueBright(mode)}`
)
module.exports = require(`./${environment}.webpack.jsx`)(
  options[`${environment}-${mode}`]
)
