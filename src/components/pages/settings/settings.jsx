import React from 'react'

import ContentWrapper from '@/components/basic/content-wrapper/content-wrapper'
import NavigationBar from '@/components/composed/navigation-bar/navigation-bar'

import './settings.scss'

export default class Settings extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <NavigationBar />
        <ContentWrapper navbar="true">
          <h1>Settings Page</h1>
          <p>{new Array(1000).fill('Lorem Ipsum, dipsum settings. ', 0, 1000).join(' ')}</p>
        </ContentWrapper>
      </>
    )
  }
}
