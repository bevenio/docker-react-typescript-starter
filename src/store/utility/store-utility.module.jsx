const extendConstants = (constantPrepend, constants) => {
  const extendedConstants = {}
  const keys = Object.keys(constants)
  for (let i = 0; i < keys.length; i += 1) {
    extendedConstants[keys[i]] = `${constantPrepend}:${constants[keys[i]]}`
  }
  return extendedConstants
}

class RestoreSingleton {
  /* Private properties */
  key = 'redux-storage:state'
  name = 'redux-entry'
  storeReference = null
  registeredEntries = []

  /* Class implementation */
  constructor(name) {
    this.name = this.name || name
    this.registerStore()
  }

  isEntryName = (entry) => typeof entry === 'string'

  createEntryName = (entry) => `${this.name}:${entry}`

  registerEntry = (entry) => {
    if (!this.registeredEntries.includes(entry)) {
      this.registeredEntries.push(entry)
    }
  }

  registerStore = () => {
    localStorage.setItem(this.key, 'active')
  }

  isStoreRegistered = () => localStorage.getItem(this.key) === 'active'

  applyListeners = () => {
    window.addEventListener(
      'pagehide',
      (event) => {
        if (this.storeReference && this.isStoreRegistered()) {
          this.registeredEntries.forEach((entry) => {
            try {
              localStorage.setItem(
                this.createEntryName(entry),
                JSON.stringify(this.storeReference.getState()[entry])
              )
            } catch (error) {
              throw new Error('Store entry could not be saved', error)
            }
          })
        }
        event.preventDefault()
      },
      { capture: true }
    )
  }

  extendStore(store) {
    this.storeReference = store
    this.applyListeners()
  }

  restoreEntry(entry) {
    if (this.isEntryName(entry)) {
      this.registerEntry(entry)
      const restoredEntry = JSON.parse(localStorage.getItem(this.createEntryName(entry)))
      const hasRestoredEntry = !!restoredEntry
      return hasRestoredEntry !== null ? restoredEntry : null
    }
    return null
  }
}

const Restore = new RestoreSingleton()

export { extendConstants }
export { Restore }

export default {
  extendConstants,
  Restore,
}
