class StorePersistSingleton {
  /* Private properties */
  key = 'redux-storage:state'
  name = 'redux-entry'
  storeReference = null
  registeredEntries = []

  /* Class implementation */
  constructor() {
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

  restoreEntry(entry) {
    if (this.isEntryName(entry)) {
      this.registerEntry(entry)
      const restoredEntry = JSON.parse(localStorage.getItem(this.createEntryName(entry)))
      const hasRestoredEntry = !!restoredEntry
      return hasRestoredEntry !== null ? restoredEntry : null
    }
    return null
  }

  extendStore(store) {
    this.storeReference = store
    this.applyListeners()
  }
}

const storePersist = new StorePersistSingleton()
export { storePersist }
export default { storePersist }
