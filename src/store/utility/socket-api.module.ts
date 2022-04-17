import { settings } from '@/settings'

const RECONNECT_TIMEOUT = 2500

type UnknownFunction = (...args: unknown[]) => unknown

interface State {
  activeSocket: WebSocket | null
  actionQueue: string[]
  actionListeners: { [actionKey: string]: UnknownFunction[] }
  actionOnceListeners: { [actionKey: string]: UnknownFunction[] }
}

class SocketInterface {
  state: State = {
    activeSocket: null,
    actionQueue: [],
    actionListeners: {},
    actionOnceListeners: {},
  }

  _reestablish() {
    window.setTimeout(() => {
      this._ensureConnection()
    }, RECONNECT_TIMEOUT)
    return null
  }

  _ensureConnection() {
    return new Promise((resolve, reject) => {
      try {
        if (!this.state.activeSocket || this.state.activeSocket.readyState >= 2) {
          this.state.activeSocket = new WebSocket(settings.api.websocket)
          this.state.activeSocket.onmessage = this._fireAction.bind(this)
          this.state.activeSocket.onclose = this._reestablish()
          this.state.activeSocket.onerror = this._reestablish()
          this.state.activeSocket.onopen = resolve.bind(this)
        } else {
          resolve(this)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  _sendActionQueue() {
    this._ensureConnection().then(() => {
      this.state.actionQueue.forEach((action) => {
        if (this.state.activeSocket) {
          this.state.activeSocket.send(action)
          this.state.actionQueue.splice(this.state.actionQueue.indexOf(action), 1)
        }
      })
    })
  }

  _fireAction(socketMessage: unknown) {
    const message = JSON.parse(String(socketMessage))
    if (typeof message.action === 'string') {
      if (this.state.actionListeners[message.action]) {
        this.state.actionListeners[message.action].forEach((listener) => {
          listener(message.options || null)
        })
      }
      if (this.state.actionOnceListeners[message.action]) {
        this.state.actionOnceListeners[message.action].forEach((listener) => {
          listener(message.options || null)
        })
        this.state.actionOnceListeners[message.action] = []
      }
    } else {
      throw new Error('Received invalid message')
    }
  }

  _pushActionListener(action: string, callback: UnknownFunction, once: boolean) {
    const actionListeners = once ? this.state.actionOnceListeners : this.state.actionListeners

    if (!actionListeners[action]) {
      actionListeners[action] = []
    }
    actionListeners[action].push(callback)
  }

  onAction(action: string, callback: UnknownFunction) {
    this._pushActionListener(action, callback, false)
  }

  onActionOnce(action: string, callback: UnknownFunction) {
    this._pushActionListener(action, callback, true)
  }

  sendAction(action: string, options: unknown) {
    const actionString: string = JSON.stringify({
      action,
      options: options || null,
    })
    this.state.actionQueue.push(actionString)
    this._sendActionQueue()
  }
}

const socketInterface = new SocketInterface()
export { socketInterface as socket }
