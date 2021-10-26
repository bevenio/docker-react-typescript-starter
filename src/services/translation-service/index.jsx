import dotProp from 'dot-prop'

import LoggingService from '@/services/logging-service'

const logger = new LoggingService('translation-service')

class TranslationServiceSingleton {
  /* Constant properties */
  DEFAULT_CODE = 'en-US'
  DEFAULT_TRANSLATION = ''

  /* Private properties */
  code = this.DEFAULT_CODE
  translations = {}

  /* Class implementation */
  constructor() {
    this.registerLanguageListeners()
    this.changeLanguage()
  }

  registerLanguageListeners = () => {
    window.addEventListener('pageshow', () => {
      window.addEventListener('languagechange', this.changeLanguage)
    })
    window.addEventListener('pagehide', () => {
      window.removeEventListener('languagechange', this.changeLanguage)
    })
  }

  retrieveCurrentLanguageCode = () => navigator.language || navigator.userLanguage

  changeLanguage = () => {
    const code = this.retrieveCurrentLanguageCode()
    this.loadLanguage(code)
  }

  loadLanguage = (code) => {
    if (!this.translations[code]) {
      import(
        /* webpackMode: "lazy" */
        /* webpackChunkName: "[request]" */
        `/static/translations/${code}.json`
      )
        .then((translationsAsJSON) => {
          this.translations[code] = translationsAsJSON
          this.code = code
          logger.debug(`Loaded translations [${code}]`)
        })
        .catch(() => {
          logger.error(`Translation [${code}] cannot be loaded, falling back to [${this.code}]`)
          this.loadLanguage(this.DEFAULT_CODE)
        })
    } else {
      this.code = code
    }
  }

  /* Exposed methods and functions */
  get code() {
    return this.currentCode
  }

  translate(identifier = '', replacements) {
    const translation = this.translations[this.code]
      ? dotProp.get(this.translations[this.code], identifier) || this.DEFAULT_TRANSLATION
      : this.DEFAULT_TRANSLATION

    return translation.replace(/\{\{(.*?)\}\}/g, (_, key) =>
      replacements[key] !== undefined ? replacements[key] : ''
    )
  }
}

const Translation = new TranslationServiceSingleton()
export { Translation }
export default Translation
