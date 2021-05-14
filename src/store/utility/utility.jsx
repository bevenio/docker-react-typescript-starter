const extendConstants = (constantPrepend, constants) => {
  const extendedConstants = {}
  const keys = Object.keys(constants)
  for (let i = 0; i < keys.length; i += 1) {
    extendedConstants[keys[i]] = `${constantPrepend}:${constants[keys[i]]}`
  }
  return extendedConstants
}

const localStorageStoreName = 'redux-state'
const extendStoreWithLocalStorage = (store) => {
  window.addEventListener('beforeunload', (event) => {
    localStorage.setItem(
      localStorageStoreName,
      JSON.stringify(store.getState())
    )
    // eslint-disable-next-line no-param-reassign
    delete event.returnValue
  })
}

let retrievedLocalStorageStore = null
const retrieveStoreLocalStorageEntry = (name) => {
  if (!retrievedLocalStorageStore) {
    retrievedLocalStorageStore = JSON.parse(
      localStorage.getItem(localStorageStoreName)
    )
  }
  return retrievedLocalStorageStore !== null
    ? retrievedLocalStorageStore[name]
    : null
}

export { extendConstants }
export { extendStoreWithLocalStorage }
export { retrieveStoreLocalStorageEntry }

export default {
  extendConstants,
  extendStoreWithLocalStorage,
  retrieveStoreLocalStorageEntry,
}
