import React from 'react'

import ExternalScriptService from '@/services/external-script-service/external-script-service'

import './spotify-player.scss'

const CONSTANTS = {
  SPOTIFY_PLAYER_NAME: 'app-spotify-player',
  SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  SPOTIFY_TOKEN: '',
}

export class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spotifyPlayer: null,
      spotifySDK: null,
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

      // Error handling
      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error(message)
      })
      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error(message)
      })
      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error(message)
      })
      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error(message)
      })

      // Playback status updates
      spotifyPlayer.addListener('player_state_changed', (state) => {
        console.log(state)
      })

      // Ready
      spotifyPlayer.addListener('ready', ({ deviceId }) => {
        console.log('Ready with Device ID', deviceId)
      })

      // Not Ready
      spotifyPlayer.addListener('not_ready', ({ deviceId }) => {
        console.log('Device ID has gone offline', deviceId)
      })

      // Connect to the player!
      spotifyPlayer.connect()

      this.setState({
        spotifyPlayer,
      })
    }
  }

  unregisterSpotifySDK = () => {
    if (this.state.spotifyPlayer) {
      this.setState({ spotifyPlayer: null })
    }
  }

  render() {
    const { songId } = this.props

    return (
      <>
        <iframe
          title={CONSTANTS.SPOTIFY_PLAYER_NAME}
          className="app-spotify-player"
          src={`https://open.spotify.com/embed/track/${songId}`}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      </>
    )
  }
}

export default SpotifyPlayer
