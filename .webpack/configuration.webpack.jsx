const chalk = require('chalk')
const environment = process.env.NODE_ENV || 'production'
const mode = process.env.MODE || 'web'

const projectConfiguration = require('./../project.json')
const localSettings = projectConfiguration.local

const optionPresets = {
  development: {
    mode: 'development',
    port: localSettings.port || '8080',
    showBundleAnalyzer: false,
    sourceMap: true,
    beautify: true,
    comments: true,
    compress: false,
    hmr: true,
    sw: false,
    publicPath: '/',
    baseHref: '/',
  },
  production: {
    mode: 'production',
    port: localSettings.port || '8080',
    showBundleAnalyzer: false,
    sourceMap: false,
    beautify: false,
    comments: false,
    compress: true,
    hmr: false,
    sw: true,
    publicPath: '/',
    baseHref: '/',
  },
  test: {
    mode: 'test',
    port: localSettings.port || '8080',
    showBundleAnalyzer: false,
    sourceMap: false,
    beautify: false,
    comments: false,
    compress: false,
    hmr: false,
    sw: false,
    publicPath: '/',
    baseHref: '/',
  },
}

const options = {
  // Development options
  'development-web': optionPresets.development,
  'development-file': {
    ...optionPresets.development,
    publicPath: '',
    baseHref: './',
  },
  // Production options
  'production-web': optionPresets.production,
  'production-file': {
    ...optionPresets.production,
    publicPath: '',
    baseHref: './',
  },
  // Test options
  'test-web': optionPresets.test,
  'test-file': {
    ...optionPresets.test,
    publicPath: '',
    baseHref: './',
  },
}

console.log(`WEBPACK: ${chalk.blueBright(environment)}, ${chalk.blueBright(mode)}`)
module.exports = require(`./${environment}.webpack.jsx`)(options[`${environment}-${mode}`])
