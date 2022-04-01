import { BroadcastChannel } from 'broadcast-channel'
import hash from 'hash-sum'
import LoggingService from '@/services/logging-service'

const logger = new LoggingService('store-share')

class StoreShareSingleton {
  /* Constant properties */
  CONTENT_TYPES = {
    ACTION: 'ACTION',
    STATE_REQUEST: 'STATE:REQUEST',
    STATE_RESPONSE: 'STATE:RESPONSE',
  }

  ACTION_TYPES = {
    INIT: 'INIT',
  }

  /* Private properties */
  key = 'redux-broadcast-channel'
  stateHash = null
  storeReference = null
  broadcastChannel = null

  /* Class implementation */
  /* Channel methods and functions */
  registerChannel = () => {
    this.broadcastChannel = new BroadcastChannel(this.key)
    window.addEventListener('pageshow', () => {
      this.broadcastChannel.addEventListener('message', this.onChannelMessage)
    })
    window.addEventListener('pagehide', () => {
      this.broadcastChannel.removeEventListener('message', this.onChannelMessage)
    })
  }

  registerStateRequest = () => {
    window.addEventListener('pageshow', () => {
      logger.debug('requesting state')
      this.sendChannelMessage(this.CONTENT_TYPES.STATE_REQUEST, {})
    })
  }

  updateStateHash = () => {
    this.stateHash = this.storeReference ? hash(this.storeReference.getState()) : null
  }

  onRemoteAction = async ({ action: remoteAction, hash: remoteHash }) => {
    if (this.stateHash === remoteHash) {
      // Remote is executing action on the same state
      const action = {
        type: remoteAction.type,
        payload: remoteAction.payload,
        shared: true,
      }
      this.reduxDispatch(action, remoteHash)
    } else {
      // Remote is executing action on a different state (hash mismatch)
      logger.debug(`hash mismatch [${this.stateHash}:${remoteHash}]`)
      this.sendChannelMessage(this.CONTENT_TYPES.STATE_REQUEST, {})
    }
  }

  onStateRequest = async () => {
    logger.debug('broadcasting state due to request')
    this.sendChannelMessage(this.CONTENT_TYPES.STATE_RESPONSE, {
      state: this.storeReference.getState(),
      hash: this.stateHash,
    })
  }

  onStateResponse = async ({ state: remoteState, hash: remoteHash }) => {
    if (this.stateHash !== remoteHash) {
      logger.debug('received state response')
      const action = {
        type: this.ACTION_TYPES.INIT,
        payload: remoteState,
        shared: true,
      }
      this.reduxDispatch(action, remoteHash)
    }
  }

  onChannelMessage = (event) => {
    const message = event && event.data ? event.data : event

    switch (message.type) {
      // Another instance triggers a store action, content: { action, hash }
      case this.CONTENT_TYPES.ACTION: {
        this.onRemoteAction(message.content)
        break
      }
      // Another instance requests a state update, content: undefined
      case this.CONTENT_TYPES.STATE_REQUEST: {
        this.onStateRequest(message.content)
        break
      }
      // Another instance broadcasts a state update, content: {state, hash}
      case this.CONTENT_TYPES.STATE_RESPONSE: {
        this.onStateResponse(message.content)
        break
      }
      default: {
        break
      }
    }
  }

  sendChannelMessage = (type, content) => {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type, content })
    }
  }

  /* Redux methods and functions */
  reduxDispatch = (action) => {
    if (this.storeReference) {
      this.storeReference.dispatch(action)
    }
  }

  reduxActionMiddleware = (/* store */) => (next) => (action) => {
    if (!action.shared) {
      this.sendChannelMessage(this.CONTENT_TYPES.ACTION, { action, hash: this.stateHash })
    }
    const middlewareResult = next(action)
    this.updateStateHash()
    return middlewareResult
  }

  /* Exposed methods and functions */
  get middleware() {
    return this.reduxActionMiddleware
  }

  extendStore(store) {
    this.storeReference = store
    this.registerChannel()
    this.registerStateRequest()
  }
}

const storeShare = new StoreShareSingleton()
export { storeShare }
export default { storeShare }
