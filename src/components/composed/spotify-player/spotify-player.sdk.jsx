import ExternalScriptService from '@/services/external-script-service'

const CONSTANTS = {
  SPOTIFY_PLAYER_NAME: 'app-spotify-player',
  SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
}

export default class SpotifyPlayerSDK {
  state = {
    spotifyToken: '',
    spotifyDeviceId: null,
    spotifyPlayer: null,
    spotifySDKReference: null,
    spotifyError: null,
    spotifyState: null,
    spotifyUpdateTime: new Date(),
    updateFuncs: [],
    isSpotifyConnected: false,
    spotifyConnectPromise: null,
    isSpotifyTrackSelected: true,
    spotifySelectedTrackId: '',
    spotifyTrackSelectPromiseResolve: null,
  }

  actions = {
    selectTrack: () => {},
    selectDevice: () => {},
  }

  constructor({ token = '', actions = {} }) {
    this.state.spotifyToken = token
    this.actions = {
      ...this.actions,
      ...actions,
    }
  }

  /* Prepare SDK */

  appendSDK = () => {
    this.state.spotifySDKReference = ExternalScriptService.appendScript(CONSTANTS.SPOTIFY_SDK_URL)
  }

  removeSDK = () => {
    if (this.spotifySDKReference) {
      ExternalScriptService.removeScript(this.state.spotifySDKReference)
    }
  }

  registerSpotifySDK = () => {
    const connection = {}
    this.state.spotifyConnectPromise = new Promise((resolve, reject) => {
      connection.ready = resolve
      connection.failed = reject
    })

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.state.spotifyToken
      this.state.spotifyPlayer = new window.Spotify.Player({
        name: CONSTANTS.SPOTIFY_PLAYER_NAME,
        getOAuthToken: (spotifyAuthtenticate) => {
          spotifyAuthtenticate(token)
        },
      })

      this.state.spotifyPlayer.addListener('initialization_error', ({ message }) => {
        this.state.spotifyError = message
      })
      this.state.spotifyPlayer.addListener('authentication_error', ({ message }) => {
        this.state.spotifyError = message
      })
      this.state.spotifyPlayer.addListener('account_error', ({ message }) => {
        this.state.spotifyError = message
      })
      this.state.spotifyPlayer.addListener('playback_error', ({ message }) => {
        this.state.spotifyError = message
      })

      this.state.spotifyPlayer.addListener('player_state_changed', (state) => {
        this.state.spotifyState = state
        this.state.spotifyUpdateTime = new Date()
        this.onSpotifyPlayerChanged()
        this.ensureTrackSelection()
      })

      this.state.spotifyPlayer.addListener('ready', ({ device_id: deviceId }) => {
        this.state.spotifyDeviceId = deviceId
        this.state.isSpotifyConnected = true
        this.actions.selectDevice({ deviceId: this.state.spotifyDeviceId })
        connection.ready()
      })

      this.state.spotifyPlayer.addListener('not_ready', () => {
        this.state.spotifyDeviceId = null
        this.state.isSpotifyConnected = false
        connection.failed()
      })

      this.state.spotifyPlayer.connect()
    }
  }

  unregisterSpotifySDK = () => {
    delete window.onSpotifyWebPlaybackSDKReady
    if (this.state.spotifyPlayer) {
      this.state.spotifyPlayer.disconnect()
      this.state.spotifyPlayer = null
    }
  }

  onSpotifyPlayerChanged = () => {
    this.state.updateFuncs.forEach((func) => {
      if (typeof func === 'function') {
        func()
      }
    })
  }

  onSpotifySDKReady = () => {
    this.state.spotifyPlayer.setVolume(1)
  }

  ensureConnection() {
    if (!this.state.isSpotifyConnected) {
      return this.state.spotifyConnectPromise
    }
    return new Promise((resolve) => {
      resolve()
    })
  }

  ensureTrackSelection() {
    const {
      spotifyState,
      isSpotifyTrackSelected,
      spotifyTrackSelectPromiseResolve,
      spotifySelectedTrackId,
    } = this.state

    if (!isSpotifyTrackSelected && spotifyTrackSelectPromiseResolve && spotifySelectedTrackId) {
      if (spotifyState && spotifyState.track_window && spotifyState.track_window.current_track) {
        const currentTrackId = spotifyState.track_window.current_track.id

        if (currentTrackId === spotifySelectedTrackId) {
          setTimeout(() => {
            spotifyTrackSelectPromiseResolve()
          }, 5100)
          this.state.isSpotifyTrackSelected = true
          this.state.spotifyTrackSelectPromiseResolve = null
        }
      }
    }
  }

  /* Exposed SDK functions */

  register() {
    this.registerSpotifySDK()
    this.appendSDK()
  }

  unregister() {
    this.unregisterSpotifySDK()
    this.removeSDK()
  }

  onUpdate(func) {
    this.state.updateFuncs.push(func)
  }

  getTrackDuration = () => {
    const { spotifyState } = this.state
    if (spotifyState && spotifyState.track_window && spotifyState.track_window.current_track) {
      return spotifyState.track_window.current_track.duration_ms
    }
    return 0
  }

  getTrackPosition = () => {
    const { spotifyState } = this.state
    if (spotifyState && spotifyState) {
      return spotifyState.position
    }
    return 0
  }

  getTrackStatus = () => {
    const { spotifyState } = this.state
    if (spotifyState && spotifyState) {
      return spotifyState.paused ? 'paused' : 'play'
    }
    return 'paused'
  }

  getTrackUpdateTime = () => {
    if (this.state.spotifyUpdateTime) {
      return this.state.spotifyUpdateTime.getTime()
    }
    return 0
  }

  getExactTrackPosition = () => {
    const { spotifyState } = this.state
    if (spotifyState) {
      if (spotifyState.paused) {
        return spotifyState.position
      }
      return spotifyState.position + (new Date().getTime() - this.state.spotifyUpdateTime.getTime())
    }
    return 0
  }

  get error() {
    return this.state.spotifyError
  }

  get ready() {
    return this.state.isSpotifyConnected
  }

  get exactTrackPosition() {
    return this.getExactTrackPosition()
  }

  get trackDuration() {
    return this.getTrackDuration()
  }

  get trackPosition() {
    return this.getTrackPosition()
  }

  get trackStatus() {
    return this.getTrackStatus()
  }

  get trackUpdateTime() {
    return this.getTrackUpdateTime()
  }

  get trackInformation() {
    const trackInformation = {
      name: '',
      artist: '',
      images: [],
      paused: false,
      duration: 0,
      position: 0,
    }

    const { spotifyState } = this.state
    if (spotifyState && spotifyState.track_window && spotifyState.track_window.current_track) {
      const currentTrack = spotifyState.track_window.current_track
      trackInformation.name = currentTrack.name
      trackInformation.artist = currentTrack.artists.map((artist) => artist.name).join(', ')
      trackInformation.images = currentTrack.album.images
      trackInformation.paused = spotifyState.paused
      trackInformation.duration = currentTrack.duration_ms
      trackInformation.position = this.exactTrackTime
    }

    return trackInformation
  }

  select(trackId) {
    return new Promise((resolve, reject) => {
      this.ensureConnection()
        .then(() => {
          this.state.isSpotifyTrackSelected = false
          this.state.spotifySelectedTrackId = trackId
          this.state.spotifyTrackSelectPromiseResolve = resolve
          this.actions.selectTrack({ trackId })
        })
        .catch(reject)
    })
  }

  resume() {
    return new Promise((resolve, reject) => {
      this.ensureConnection()
        .then(() => {
          this.state.spotifyPlayer.resume().then(resolve).catch(reject)
        })
        .catch(reject)
    })
  }

  pause() {
    return new Promise((resolve, reject) => {
      this.ensureConnection()
        .then(() => {
          this.state.spotifyPlayer.pause().then(resolve).catch(reject)
        })
        .catch(reject)
    })
  }

  toggle() {
    return new Promise((resolve, reject) => {
      this.ensureConnection()
        .then(() => {
          this.state.spotifyPlayer.togglePlay().then(resolve).catch(reject)
        })
        .catch(reject)
    })
  }
}