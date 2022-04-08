import React from 'react'

export class SpotifyLoading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="app-spotify-player">
        <div className="app-spotify-player-text">
          <h4>Loading...</h4>
        </div>
      </div>
    )
  }
}

export default {
  SpotifyLoading,
}
