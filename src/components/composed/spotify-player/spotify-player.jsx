import React from 'react'

import ExternalScriptService from '@/services/external-script-service/external-script-service'

import './spotify-player.scss'

const CONSTANTS = {
  SPOTIFY_PLAYER_NAME: 'app-spotify-player',
  SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  SPOTIFY_TOKEN:
    'BQDP1TI_a3-JwMNFSB8UZj-UL3EyCbAMjuVDIIrvFbeHGCMCVg40cbNKdMm_FabkHH1AIZUU6IG3uH9_UkVTFWp_m9gke7nvqbezfgaIfbFGCwYUxqfDArT2TX3x85a1wBRaqU0ikpnz1E7TbCWu5Uo6ZKMEX2t3',
}

export class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spotifyPlayer: null,
      spotifySDK: null,
      spotifyDeviceId: null,
      spotifyError: null,
      spotifyState: null,
    }
  }

  componentDidMount() {
    this.registerSpotifySDK()
    this.appendSpotifySDK()
  }

  componentWillUnmount() {
    this.unregisterSpotifySDK()
    this.removeSpotifySDK()
  }

  appendSpotifySDK = () => {
    this.setState({
      spotifySDK: ExternalScriptService.appendScript(CONSTANTS.SPOTIFY_SDK_URL),
    })
  }

  removeSpotifySDK = () => {
    if (this.state.spotifySDK) {
      ExternalScriptService.removeScript(this.state.spotifySDK)
      this.setState({ spotifySDK: null })
    }
  }

  registerSpotifySDK = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = CONSTANTS.SPOTIFY_TOKEN
      const spotifyPlayer = new window.Spotify.Player({
        name: CONSTANTS.SPOTIFY_PLAYER_NAME,
        getOAuthToken: (spotifyAuthtenticate) => {
          spotifyAuthtenticate(token)
        },
      })

      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        this.setState({ spotifyError: message })
      })
      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        this.setState({ spotifyError: message })
      })
      spotifyPlayer.addListener('account_error', ({ message }) => {
        this.setState({ spotifyError: message })
      })
      spotifyPlayer.addListener('playback_error', ({ message }) => {
        this.setState({ spotifyError: message })
      })

      spotifyPlayer.addListener('player_state_changed', (state) => {
        this.setState({ spotifyState: state })
        this.onSpotifyPlayerChanged()
      })

      // eslint-disable-next-line camelcase
      spotifyPlayer.addListener('ready', ({ device_id: deviceId }) => {
        this.setState({ spotifyDeviceId: deviceId })
        this.onSpotifySDKReady()
      })

      spotifyPlayer.addListener('not_ready', () => {
        this.setState({
          spotifyDeviceId: null,
        })
      })

      spotifyPlayer.connect()

      this.setState({ spotifyPlayer })
    }
  }

  onSpotifySDKReady = () => {
    this.state.spotifyPlayer.setVolume(1)
  }

  onSpotifyPlayerChanged = () => {}

  unregisterSpotifySDK = () => {
    if (this.state.spotifyPlayer) {
      this.state.disconnect()
      this.setState({ spotifyPlayer: null })
    }
  }

  getTrackInformation = () => {
    const trackInformation = {
      name: '',
      artist: '',
      images: [],
      paused: false,
      position: 0,
    }

    const { spotifyState } = this.state
    if (spotifyState && spotifyState.track_window && spotifyState.track_window.current_track) {
      const currentTrack = spotifyState.track_window.current_track
      trackInformation.name = currentTrack.name
      trackInformation.artist = currentTrack.artists.map((artist) => artist.name).join(', ')
      trackInformation.images = currentTrack.album.images
      trackInformation.paused = currentTrack.paused
      trackInformation.position = currentTrack.position
    }

    return trackInformation
  }

  getDeviceInformation = () => ({
    name: CONSTANTS.SPOTIFY_PLAYER_NAME,
    id: this.state.spotifyDeviceId,
  })

  render() {
    const track = this.getTrackInformation()
    const device = this.getDeviceInformation()

    return (
      <div className="app-spotify-player">
        Track: {track.name} by {track.artist} <br />
        Status: {track.paused
          ? 'Playback paused'
          : `Playing at position ${track.position || 0}`}{' '}
        <br />
        [Device: {device.id} | Error: {this.state.spotifyError}]
      </div>
    )
  }
}

export default SpotifyPlayer
