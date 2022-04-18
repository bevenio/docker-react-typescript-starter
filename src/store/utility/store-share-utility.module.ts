import { BroadcastChannel } from 'broadcast-channel'
import hash from 'hash-sum'

import { LoggingService } from '@/services/logging-service'

const logger = new LoggingService('store-share')

interface BroadcastAction {
  action: ReduxAction<unknown>
  hash: string
}

interface BroadcastState {
  state: ReduxState
  hash: string
}

interface BroadcastEvent {
  data: {
    type: string
    content: string
  }
  type: string
  content: string
}

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
  stateHash = ''
  storeReference: ReduxStore | null = null
  broadcastChannel: BroadcastChannel | null = null

  /* Class implementation */
  /* Channel methods and functions */
  registerChannel = () => {
    this.broadcastChannel = new BroadcastChannel(this.key)
    window.addEventListener('pageshow', () => {
      if (this.broadcastChannel) this.broadcastChannel.addEventListener('message', this.onChannelMessage)
    })
    window.addEventListener('pagehide', () => {
      if (this.broadcastChannel) this.broadcastChannel.removeEventListener('message', this.onChannelMessage)
    })
  }

  registerStateRequest = () => {
    window.addEventListener('pageshow', () => {
      logger.debug('requesting state')
      this.sendChannelMessage(this.CONTENT_TYPES.STATE_REQUEST, {})
    })
  }

  updateStateHash = () => {
    this.stateHash = this.storeReference ? hash(this.storeReference.getState()) : ''
  }

  onRemoteAction = async (broadcastAction: BroadcastAction) => {
    if (this.stateHash === broadcastAction.hash) {
      // Remote is executing action on the same state
      const remoteAction: ReduxAction<unknown> = {
        type: broadcastAction.action.type,
        payload: broadcastAction.action.payload,
        shared: true,
      }
      this.reduxDispatch(remoteAction)
    } else {
      // Remote is executing action on a different state (hash mismatch)
      logger.debug(`hash mismatch [${this.stateHash}:${broadcastAction.hash}]`)
      this.sendChannelMessage(this.CONTENT_TYPES.STATE_REQUEST, {})
    }
  }

  onStateRequest = async () => {
    if (this.storeReference) {
      logger.debug('broadcasting state due to request')
      this.sendChannelMessage(this.CONTENT_TYPES.STATE_RESPONSE, {
        state: this.storeReference.getState(),
        hash: this.stateHash,
      })
    } else {
      logger.debug('cannot broadcast requested state')
    }
  }

  onStateResponse = async (broadcastState: BroadcastState) => {
    if (this.stateHash !== broadcastState.hash) {
      logger.debug('received state response')
      const action = {
        type: this.ACTION_TYPES.INIT,
        payload: broadcastState.state,
        shared: true,
      }
      this.reduxDispatch(action)
    }
  }

  onChannelMessage = (event: BroadcastEvent) => {
    const message = event && event.data ? event.data : event

    switch (message.type) {
      // Another instance triggers a store action, content: { action, hash }
      case this.CONTENT_TYPES.ACTION: {
        const remoteAction = message.content as unknown as BroadcastAction
        this.onRemoteAction(remoteAction)
        break
      }
      // Another instance requests a state update, content: undefined
      case this.CONTENT_TYPES.STATE_REQUEST: {
        this.onStateRequest()
        break
      }
      // Another instance broadcasts a state update, content: {state, hash}
      case this.CONTENT_TYPES.STATE_RESPONSE: {
        const remoteState = message.content as unknown as BroadcastState
        this.onStateResponse(remoteState)
        break
      }
      default: {
        break
      }
    }
  }

  sendChannelMessage = (type: string, content: unknown) => {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type, content })
    }
  }

  /* Redux methods and functions */
  reduxDispatch = (action: ReduxAction<unknown>) => {
    if (this.storeReference) {
      this.storeReference.dispatch(action)
    }
  }

  reduxActionMiddleware = (/* store */) => (next: ReduxDispatch) => (action: ReduxAction<unknown>) => {
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

  extendStore(store: ReduxStore) {
    this.storeReference = store
    this.registerChannel()
    this.registerStateRequest()
  }
}

const storeShare = new StoreShareSingleton()
export { storeShare }
