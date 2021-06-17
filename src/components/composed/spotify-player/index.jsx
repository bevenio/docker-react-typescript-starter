import React from 'react'
import { connect } from 'react-redux'
import { entries } from '@/store/store'

import SpotifyPlayerSDK from './spotify-player.sdk'
import { SpotifyPlaybackPlayer } from './components/spotify-playback-player.component'
import { SpotifyLoginRedirect } from './components/spotify-login-redirect.component'
import { SpotifyLoading } from './components/spotify-loading.component'

import './spotify-player.scss'

const CONSTANTS = {
  PROGRESS_UPDATE_TIME: 500,
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
      playerSDK.select(this.props.track)
      playerSDK.resume()
      playerSDK.onUpdate(() => {
        this.updateCallbackCall()
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

  updateCallbackCall = () => {
    if (this.props.onUpdate && typeof this.props.onUpdate === 'function') {
      this.props.onUpdate({
        position: this.state.spotifyPlayerSDK.exactTrackPosition,
        duration: this.state.spotifyPlayerSDK.trackDuration,
        status: this.state.spotifyPlayerSDK.trackStatus,
      })
    }
  }

  updateProgress = () => {
    const position = this.state.spotifyPlayerSDK.exactTrackPosition
    const duration = this.state.spotifyPlayerSDK.trackDuration

    const progressInPercent = position && duration ? (position / duration) * 100 : 0

    this.updateCallbackCall()
    this.setState({
      trackProgress: progressInPercent,
    })
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
      dispatch(entries.spotify.actions.redirectToSpotify())
    },
    selectDevice: ({ deviceId }) => {
      dispatch(entries.spotify.actions.selectDevice({ deviceId }))
    },
    selectTrack: ({ trackId }) => {
      dispatch(entries.spotify.actions.selectTrack({ trackId }))
    },
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlayer)
