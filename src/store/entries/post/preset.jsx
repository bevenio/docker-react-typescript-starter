import { retrieveStoreLocalStorageEntry } from '@/store/utility/utility'

const options = {}

const preset = retrieveStoreLocalStorageEntry('post') || {
  lastUpdate: null,
  updateCounter: 0,
  posts: [],
}

export { options }
export { preset }

export default {
  options,
  preset,
}
