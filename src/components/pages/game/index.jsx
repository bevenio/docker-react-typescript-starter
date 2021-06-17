import React from 'react'

import BeatGame from '@/components/composed/beat-game'
import SpotifyPlayer from '@/components/composed/spotify-player'

import './game.scss'

export default class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      trackId: '33gwZOGJWEZ7dRWPqPxBEZ',
      track: [],
      trackStatus: 'paused',
      trackPosition: 0,
      trackDuration: 0,
    }
  }

  onSpotifyPlayerUpdate = ({ duration, position, status }) => {
    this.setState({
      trackPosition: position,
      trackDuration: duration,
      trackStatus: status,
    })
  }

  render() {
    return (
      <div className="app-game-container">
        <div className="app-game-beat-game">
          <BeatGame
            track={this.state.track}
            status={this.state.trackStatus}
            position={this.state.trackPosition}
            duration={this.state.trackDuration}
          />
        </div>
        <div className="app-game-spotify-player">
          <SpotifyPlayer track={this.state.trackId} onUpdate={this.onSpotifyPlayerUpdate} />
        </div>
      </div>
    )
  }
}
