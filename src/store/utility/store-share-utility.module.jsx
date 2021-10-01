import { BroadcastChannel } from 'broadcast-channel'
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
  storeReference = null
  broadcastChannel = null
  broadcastUpdateDate = new Date()

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
      logger.debug('requested state')
      this.sendChannelMessage(this.CONTENT_TYPES.STATE_REQUEST, {})
    })
  }

  onAction = ({ action: remoteAction }) => {
    const action = {
      type: remoteAction.type,
      payload: remoteAction.payload,
      shared: true,
    }
    this.reduxDispatch(action)
  }

  onStateRequest = () => {
    logger.debug('received state request')
    const localState = this.storeReference.getState()
    this.sendChannelMessage(this.CONTENT_TYPES.STATE_RESPONSE, {
      date: new Date(),
      state: localState,
    })
  }

  onStateResponse = ({ date, state }) => {
    if (date > this.broadcastUpdateDate) {
      logger.debug('received state response')
      const action = {
        type: this.ACTION_TYPES.INIT,
        payload: state,
        shared: true,
      }
      this.reduxDispatch(action)
    }
  }

  onChannelMessage = (event) => {
    const message = event && event.data ? event.data : event

    switch (message.type) {
      // Another instance triggers a store action
      case this.CONTENT_TYPES.ACTION: {
        this.onAction(message.content)
        break
      }
      // Another instance requests a state update
      case this.CONTENT_TYPES.STATE_REQUEST: {
        this.onStateRequest(message.content)
        break
      }
      // Another instance broadcasts a state update
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
      this.sendChannelMessage(this.CONTENT_TYPES.ACTION, { action })
    }
    return next(action)
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
