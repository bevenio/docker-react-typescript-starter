import { settings } from '@/settings'

const RECONNECT_TIMEOUT = 2500

class SocketInterface {
  constructor() {
    this._activeSocket = null
    this._actionQueue = []
    this._actionListeners = {}
    this._actionOnceListeners = {}
  }

  _reestablish() {
    window.setTimeout(() => {
      this._ensureConnection()
    }, RECONNECT_TIMEOUT)
  }

  _ensureConnection() {
    return new Promise((resolve, reject) => {
      try {
        if (!this._activeSocket || this._activeSocket.readyState >= 2) {
          this._activeSocket = new WebSocket(settings.api.websocket)
          this._activeSocket.onmessage = this._fireAction.bind(this)
          this._activeSocket.onclose = this._reestablish()
          this._activeSocket.onerror = this._reestablish()
          this._activeSocket.onopen = resolve.bind(this)
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
      this._actionQueue.forEach((action) => {
        this._activeSocket.send(action)
        this._actionQueue.splice(this._actionQueue.indexOf(action), 1)
      })
    })
  }

  _fireAction(socketMessage) {
    const message = JSON.parse(socketMessage.data)
    if (typeof message.action === 'string') {
      if (this._actionListeners[message.action]) {
        this._actionListeners[message.action].forEach((listener) => {
          listener(message.options || null)
        })
      }
      if (this._actionOnceListeners[message.action]) {
        this._actionOnceListeners[message.action].forEach((listener) => {
          listener(message.options || null)
        })
        this._actionOnceListeners[message.action] = []
      }
    } else {
      throw new Error('Received invalid message')
    }
  }

  _pushActionListener(action, callback, once) {
    const actionListeners = once ? this._actionOnceListeners : this._actionListeners

    if (typeof action === 'string' && typeof callback === 'function') {
      if (!actionListeners[action]) {
        actionListeners[action] = []
      }
      actionListeners[action].push(callback)
    } else {
      throw new Error('first parameter must be a string, the second a function')
    }
  }

  onAction(action, callback) {
    this._pushActionListener(action, callback, false)
  }

  onActionOnce(action, callback) {
    this._pushActionListener(action, callback, true)
  }

  sendAction(action, options) {
    if (typeof action === 'string') {
      this._actionQueue.push(
        JSON.stringify({
          action,
          options: options || null,
        })
      )
      this._sendActionQueue()
    } else {
      throw new Error('first parameter must be a string')
    }
  }
}

const socketInterface = new SocketInterface()
export { socketInterface as socket }
