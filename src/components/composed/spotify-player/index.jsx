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
      spotifyPlayerSDK: new SpotifyPlayerSDK(),
      timelineIntervalId: null,
      trackProgress: 0,
    }
  }

  componentDidMount() {
    if (this.props.reduxState.spotify.jwt) {
      this.state.spotifyPlayerSDK.register()
      this.state.spotifyPlayerSDK.onUpdate(() => {
        this.forceUpdate()
      })
      this.state.spotifyPlayerSDK.select(this.props.track)
      this.state.spotifyPlayerSDK.resume()
      this.setState({
        timelineIntervalId: window.setInterval(this.updateProgress, CONSTANTS.PROGRESS_UPDATE_TIME),
      })
    }
  }

  componentWillUnmount() {
    this.state.spotifyPlayerSDK.unregister()
    window.clearInterval(this.state.timelineIntervalId)
  }

  updateProgress = () => {
    const track = this.state.spotifyPlayerSDK.trackInformation
    const { position, duration } = track
    const progressInPercent = position && duration ? (position / duration) * 100 : 0

    this.setState({
      trackProgress: progressInPercent,
    })
  }

  render() {
    const track = this.state.spotifyPlayerSDK.trackInformation
    const toggle = () => {
      this.state.spotifyPlayerSDK.toggle()
    }
    const redirect = () => {
      this.props.reduxActions.redirectToSpotify()
    }

    if (!this.props.reduxState.spotify.jwt) {
      return <SpotifyLoginRedirect redirectToSpotify={redirect} />
    }
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
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlayer)
