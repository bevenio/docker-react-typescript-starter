import React from 'react'

import NavigationBar from '@/components/composed/navigation-bar/navigation-bar'
import ContentWrapper from '@/components/basic/content-wrapper/content-wrapper'

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
        <ContentWrapper navbar="true">Landing</ContentWrapper>
      </>
    )
  }
}
