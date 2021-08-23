import React from 'react'

import NavigationBar from '@/components/composed/navigation-bar'
import ContentWrapper from '@/components/basic/content-wrapper'

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
          <p>
            {new Array(1000)
              .fill('Laura Brachmann muss noch Hausaufgaben machen. ', 0, 1000)
              .join(' ')}
          </p>
        </ContentWrapper>
      </>
    )
  }
}
