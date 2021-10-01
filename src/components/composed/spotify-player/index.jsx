import React from 'react'
import { connect } from 'react-redux'
import { entries } from '@/store/store'

import SpotifyPlayerSDK from './spotify-player.sdk'
import { SpotifyPlaybackPlayer } from './components/spotify-playback-player.component'
import { SpotifyLoginRedirect } from './components/spotify-login-redirect.component'
import { SpotifyLoading } from './components/spotify-loading.component'

import './spotify-player.scss'

const CONSTANTS = {
  PROGRESS_UPDATE_TIME: 1000,
}

export class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spotifyPlayerSDK: null,
      timelineIntervalId: null,
      trackProgress: 0,
    }
  }

  componentDidMount() {
    if (this.props.reduxState.spotify.auth.jwt) {
      const playerSDK = new SpotifyPlayerSDK({
        token: this.props.reduxState.spotify.auth.jwt,
        actions: this.props.reduxActions,
      })

      playerSDK.register()
      playerSDK.select(this.props.track).then(() => {
        playerSDK.resume()
      })
      playerSDK.onUpdate(() => {
        this.updateProgress()
        this.forceUpdate()
      })

      this.setState({
        timelineIntervalId: window.setInterval(this.updateProgress, CONSTANTS.PROGRESS_UPDATE_TIME),
        spotifyPlayerSDK: playerSDK,
      })
    }
  }

  componentWillUnmount() {
    const playerSDK = this.state.spotifyPlayerSDK
    playerSDK.unregister()
    window.clearInterval(this.state.timelineIntervalId)
  }

  updateCallbackCall = ({ position, duration, status }) => {
    if (this.props.onUpdate && typeof this.props.onUpdate === 'function') {
      this.props.onUpdate({ position, duration, status })
    }
  }

  updateProgress = () => {
    const position = this.state.spotifyPlayerSDK.exactTrackPosition
    const duration = this.state.spotifyPlayerSDK.trackDuration
    const status = this.state.spotifyPlayerSDK.trackStatus
    const progressInPercent = position && duration ? (position / duration) * 100 : 0

    this.setState({ trackProgress: progressInPercent })
    this.updateCallbackCall({ position, duration, status })
  }

  render() {
    const toggle = () => {
      this.state.spotifyPlayerSDK.toggle()
    }
    const redirect = () => {
      this.props.reduxActions.redirectToSpotify()
    }

    if (!this.props.reduxState.spotify.auth.jwt) {
      return <SpotifyLoginRedirect redirectToSpotify={redirect} />
    }
    if (!this.state.spotifyPlayerSDK) {
      return <SpotifyLoginRedirect redirectToSpotify={redirect} />
    }
    if (!this.state.spotifyPlayerSDK.ready) {
      return <SpotifyLoading />
    }

    const track = this.state.spotifyPlayerSDK.trackInformation
    return (
      <SpotifyPlaybackPlayer
        track={track}
        progress={this.state.trackProgress}
        togglePlayback={toggle}
      />
    )
  }
}

/* Redux Connection */
const mapStateToProps = (state) => ({
  reduxState: {
    spotify: state.spotify,
  },
})

const mapDispatchToProps = (dispatch) => ({
  reduxActions: {
    redirectToSpotify: () => {
      dispatch(entries.actions.spotify.redirectToSpotify())
    },
    selectDevice: ({ deviceId }) => {
      dispatch(entries.actions.spotify.selectDevice({ deviceId }))
    },
    selectTrack: ({ trackId }) => {
      dispatch(entries.actions.spotify.selectTrack({ trackId }))
    },
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlayer)
