import React from 'react'

import SpotifyPlayerSDK from './spotify-player.sdk'
import { SpotifyPlaybackPlayer } from './spotify-player.component'

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

    return (
      <SpotifyPlaybackPlayer
        track={track}
        progress={this.state.trackProgress}
        togglePlayback={toggle}
      />
    )
  }
}

export default SpotifyPlayer
