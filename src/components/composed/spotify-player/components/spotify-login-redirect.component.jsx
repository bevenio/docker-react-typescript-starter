import React from 'react'

export class SpotifyLoginRedirect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const redirectToSpotify = this.props.redirectToSpotify || (() => {})

    return (
      <>
        <div className="app-spotify-player">
          <button className="app-spotify-player-button" type="button" onClick={redirectToSpotify}>
            Login with Spotify
          </button>
        </div>
      </>
    )
  }
}

export default {
  SpotifyLoginRedirect,
}
