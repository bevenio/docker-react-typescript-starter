import React from 'react'

import BeatGame from '@/components/composed/beat-game'
import SpotifyPlayer from '@/components/composed/spotify-player'

import './game.scss'

export default class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      trackId: '33gwZOGJWEZ7dRWPqPxBEZ',
    }
  }

  render() {
    return (
      <div className="app-game-container">
        <div className="app-game-beat-game">
          <BeatGame track={this.state.trackId} />
        </div>
        <div className="app-game-spotify-player">
          <SpotifyPlayer className="" track={this.state.trackId} />
        </div>
      </div>
    )
  }
}
