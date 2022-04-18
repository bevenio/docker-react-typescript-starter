import { get } from 'dot-prop'

/* Store */
import { store, actions } from '@/store/store'

/* Services */
import { LoggingService } from '@/services/logging-service'

type LanguageCode = string
type Translation = string | undefined

interface TranslationCollection {
  [translationKey: string]: TranslationCollection | Translation
}

interface TranslationLanguageCollection {
  [translationLanguageKey: string]: TranslationCollection
}

interface TranslationLanguageExportCollection {
  [translationLanguageKey: string]: {
    [translationKey: string]: Translation
  }
}

interface TranslationExportCollection {
  [translationKey: string]: Translation
}

interface Replacements {
  [replacementKey: string]: string
}

const logger = new LoggingService('translation-service')

class TranslatorSingleton {
  /* Constant properties */
  DEFAULT_CODE = 'en-US'
  DEFAULT_TRANSLATION = undefined

  /* Private properties */
  code: LanguageCode = this.DEFAULT_CODE
  translations: TranslationLanguageCollection = {}

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
    store.dispatch(actions.settings.changeLang({ lang: this.code }))
  }

  loadLanguage = (code: string) => {
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
  replace = (translation: Translation, replacements: Replacements = {}): Translation =>
    typeof translation === 'string'
      ? translation.replace(/\{\{(.*?)\}\}/g, (_, key) => (replacements[key] !== undefined ? replacements[key] : ''))
      : this.DEFAULT_TRANSLATION

  retrieve = (identifier: string): Translation =>
    this.translations[this.code] ? get(this.translations[this.code], identifier) || this.DEFAULT_TRANSLATION : this.DEFAULT_TRANSLATION

  /* Exposed methods and functions */
  get ready() {
    return !!this.translations[this.code]
  }

  translate(identifier = '', replacements: Replacements = {}): Translation {
    const translation = this.retrieve(identifier)
    if (typeof translation !== 'string') throw new Error('A single translation string is expected to be found')
    return this.replace(translation, replacements)
  }

  translateBatch(identifier = '', replacements: Replacements = {}) {
    const baseTranslationProxy: TranslationLanguageExportCollection = {}
    const baseProxy = baseTranslationProxy as unknown as TranslationExportCollection

    return new Proxy<TranslationExportCollection>(baseProxy, {
      get: (target: TranslationExportCollection, prop: string): string | undefined => {
        // Language code cache
        if (!target[this.code]) {
          baseTranslationProxy[this.code] = {}
        }
        // Cached translation
        if (baseTranslationProxy[this.code][prop]) {
          return String(baseTranslationProxy[this.code][prop])
        }
        // Fresh translation
        const translation = this.retrieve(identifier)
        if (typeof translation === 'object' && translation[prop]) {
          baseTranslationProxy[this.code][prop] = this.replace(translation[prop], replacements)
        }
        // Return translation or default
        return String(baseTranslationProxy[this.code][prop] || this.DEFAULT_TRANSLATION)
      },
    })
  }
}

const Translator = new TranslatorSingleton()
export { Translator }
