import React from 'react'
import { connect } from 'react-redux'
import { entries } from '@/store/store'

import SpotifyPlayerSDK from './spotify-player.sdk'
import { SpotifyPlaybackPlayer } from './spotify-playback-player.component'
import { SpotifyLoginRedirect } from './spotify-login-redirect.component'

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

  updateProgress = () => {
    const position = this.state.spotifyPlayerSDK.exactTrackTime
    const duration = this.state.spotifyPlayerSDK.exactTrackDuration

    const progressInPercent = position && duration ? (position / duration) * 100 : 0

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

    if (!this.state.spotifyPlayerSDK) {
      return <SpotifyLoginRedirect redirectToSpotify={redirect} />
    }
    if (!this.props.reduxState.spotify.auth.jwt) {
      return <SpotifyLoginRedirect redirectToSpotify={redirect} />
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

// Redux Connection
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
    selectTrack: ({ deviceId, trackId }) => {
      dispatch(entries.spotify.actions.selectTrack({ deviceId, trackId }))
    },
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlayer)
