const chalk = require('chalk')
const environment = process.env.NODE_ENV || 'production'
const mode = process.env.MODE || 'web'

const projectConfiguration = require('./../project.json')
const localMachineSettings = projectConfiguration.local_machine

const optionPresets = {
  development: {
    mode: 'development',
    port: localMachineSettings.port || '8080',
    showBundleAnalyzer: false,
    sourceMap: true,
    beautify: true,
    comments: true,
    hmr: true,
    publicPath: '/',
    baseHref: '/',
  },
  production: {
    mode: 'production',
    port: localMachineSettings.port || '8080',
    showBundleAnalyzer: false,
    sourceMap: false,
    beautify: false,
    comments: false,
    hmr: false,
    publicPath: '/',
    baseHref: '/',
  },
  test: {
    mode: 'test',
    port: localMachineSettings.port || '8080',
    showBundleAnalyzer: false,
    sourceMap: false,
    beautify: false,
    comments: false,
    hmr: false,
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
