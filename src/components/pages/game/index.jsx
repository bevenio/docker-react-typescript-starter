import React from 'react'

/* Styles */
import './game.scss'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import BeatGame from '@/components/composed/beat-game'
import SpotifyPlayer from '@/components/composed/spotify-player'

const TEST_TRACK = [
  { time: 550, action: 'a1' },
  { time: 1040, action: 'b1' },
  { time: 1290, action: 'a1' },
  { time: 1530, action: 'a1' },
  { time: 2010, action: 'b1' },
  { time: 2500, action: 'a1' },
  { time: 2990, action: 'b1' },
  { time: 3240, action: 'a1' },
  { time: 3480, action: 'a1' },
  { time: 3960, action: 'b1' },
  { time: 4450, action: 'a1' },
  { time: 4940, action: 'b2' },
  { time: 5190, action: 'a1' },
  { time: 5430, action: 'a1' },
  { time: 5910, action: 'b2' },
  { time: 6400, action: 'a1' },
  { time: 6890, action: 'b1' },
  { time: 7140, action: 'a1' },
  { time: 7380, action: 'a1' },
  { time: 7860, action: 'b1' },
  { time: 8350, action: 'a1' },
  { time: 8840, action: 'b2' },
  { time: 9090, action: 'a1' },
  { time: 9330, action: 'a2' },
  { time: 9810, action: 'b1' },
  { time: 10300, action: 'a1' },
  { time: 10790, action: 'b1' },
  { time: 11040, action: 'a1' },
  { time: 11280, action: 'a1' },
  { time: 11760, action: 'b1' },
  { time: 12250, action: 'a2' },
  { time: 12740, action: 'b2' },
  { time: 12990, action: 'a2' },
  { time: 13230, action: 'a2' },
  { time: 13710, action: 'b2' },
  { time: 14200, action: 'a1' },
  { time: 14690, action: 'b2' },
  { time: 15940, action: 'a1' },
  { time: 16180, action: 'a1' },
  { time: 16660, action: 'b2' },
]

export default class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      trackId: '4ZdjCuiWBv2weLftWPJ72c',
      track: TEST_TRACK,
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
      <PageLayout>
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
      </PageLayout>
    )
  }
}
