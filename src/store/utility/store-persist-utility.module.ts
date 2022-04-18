import { LoggingService } from '@/services/logging-service'

const logger = new LoggingService('store-persist')

class StorePersistSingleton {
  /* Private properties */
  key = 'redux-storage:state'
  name = 'redux-entry'
  storeReference: ReduxStore | null = null
  registeredEntries: ReduxStateKey[] = []

  /* Class implementation */
  constructor() {
    this.registerStore()
  }

  createEntryName = (entry: ReduxStateKey): string => `${this.name}:${String(entry)}`

  registerEntry = (entry: ReduxStateKey): void => {
    if (!this.registeredEntries.includes(entry)) {
      this.registeredEntries.push(entry)
    }
  }

  registerStore = (): void => {
    localStorage.setItem(this.key, 'active')
  }

  isStoreRegistered = (): boolean => localStorage.getItem(this.key) === 'active'

  applyListeners = (): void => {
    window.addEventListener(
      'pagehide',
      (event) => {
        if (this.isStoreRegistered()) {
          this.registeredEntries.forEach((entry) => {
            try {
              if (this.storeReference) {
                logger.debug('persisting state')
                const state: ReduxState = this.storeReference.getState()
                localStorage.setItem(this.createEntryName(entry), JSON.stringify(state[entry]))
              } else {
                logger.error('state cannot be persisted, since there is no reference')
              }
            } catch {
              throw new Error('Store entry could not be saved')
            }
          })
        }
        event.preventDefault()
      },
      { capture: true }
    )
  }

  restoreEntry(entry: ReduxStateKey): ReduxState[ReduxStateKey] {
    try {
      logger.debug(`restoring entry (${String(entry)})`)
      this.registerEntry(entry)
      const restoredEntry = localStorage.getItem(this.createEntryName(entry))
      return restoredEntry && restoredEntry !== undefined ? JSON.parse(restoredEntry) : null
    } catch {
      logger.error(`could not restore entry (${String(entry)})`)
      return null
    }
  }

  extendStore(store: ReduxStore): void {
    this.storeReference = store
    this.applyListeners()
  }
}

const storePersist = new StorePersistSingleton()
export { storePersist }
