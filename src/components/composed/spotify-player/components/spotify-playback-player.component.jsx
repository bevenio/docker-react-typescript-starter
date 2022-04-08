import React from 'react'

export class SpotifyPlaybackPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const togglePlayback = this.props.togglePlayback || (() => {})
    const { artist, name, images, paused } = this.props.track
    const progress = this.props.progress || 0

    return (
      <div className="app-spotify-player">
        {images.length > 0 ? <img className="app-spotify-player-cover" src={images[0].url} alt="album cover" /> : ''}
        <div className="app-spotify-player-progress" style={{ width: `${progress}%` }} />
        <div className="app-spotify-player-text">
          <h4>
            {name} by {artist}
          </h4>
        </div>
        <button className="app-spotify-player-button" type="button" onClick={togglePlayback}>
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    )
  }
}

export default {
  SpotifyPlaybackPlayer,
}
