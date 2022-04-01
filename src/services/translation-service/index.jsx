import React from 'react'
import dotProp from 'dot-prop'

/* Store */
import { store, entries } from '@/store/store'

/* Services */
import LoggingService from '@/services/logging-service'

/* Components */
import TextPlaceholder from '@/components/basic/text-placeholder'

const logger = new LoggingService('translation-service')

class TranslatorSingleton {
  /* Constant properties */
  DEFAULT_CODE = 'en-US'
  DEFAULT_TRANSLATION = (<TextPlaceholder />)

  /* Private properties */
  code = this.DEFAULT_CODE
  translations = {}

  /* Class implementation */
  constructor() {
    this.registerLanguageListeners()
    this.changeLanguage()
  }

  /* Setting and changing language */
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

  dispatchLanguageChange = () => {
    store.dispatch(entries.actions.settings.changeLang(this.code))
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
          this.dispatchLanguageChange()
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

  /* Translation processing */
  replace = (translation, replacements = {}) =>
    typeof translation === 'string'
      ? translation.replace(/\{\{(.*?)\}\}/g, (_, key) => (replacements[key] !== undefined ? replacements[key] : ''))
      : this.DEFAULT_TRANSLATION

  retrieve = (identifier) =>
    this.translations[this.code] ? dotProp.get(this.translations[this.code], identifier) || this.DEFAULT_TRANSLATION : this.DEFAULT_TRANSLATION

  /* Exposed methods and functions */
  get code() {
    return this.code
  }

  get ready() {
    return !!this.translations[this.code]
  }

  translate(identifier = '', replacements) {
    const translation = this.retrieve(identifier)
    if (typeof translation !== 'string') throw new Error('A single translation string is expected to be found')
    return this.replace(translation, replacements)
  }

  translateBatch(identifier = '', replacements) {
    const baseTranslationProxy = {}
    return new Proxy(baseTranslationProxy, {
      get: (target, prop) => {
        // Language code cache
        if (!target[this.code]) {
          baseTranslationProxy[this.code] = {}
        }
        // Cached translation
        if (target[this.code][prop]) {
          return target[this.code][prop]
        }
        // Fresh translation
        const translation = this.retrieve(identifier)
        if (typeof translation === 'object' && translation[prop])
          baseTranslationProxy[this.code][prop] = this.replace(translation[prop], replacements)
        // Return translation or default
        return target[this.code][prop] || this.DEFAULT_TRANSLATION
      },
    })
  }
}

const Translator = new TranslatorSingleton()
export default Translator
