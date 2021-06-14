import React from 'react'

import NavigationBar from '@/components/composed/navigation-bar'
import ContentWrapper from '@/components/basic/content-wrapper'
import SpotifyPlayer from '@/components/composed/spotify-player'

import './landing.scss'

export default class Landing extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <NavigationBar />
        <ContentWrapper navbar="true">
          <h1>Landing Page</h1>
          <SpotifyPlayer track="33gwZOGJWEZ7dRWPqPxBEZ" />
          <p>{new Array(1000).fill('Lorem Ipsum, dipsum. ', 0, 1000).join(' ')}</p>
        </ContentWrapper>
      </>
    )
  }
}
