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
        <NavigationBar navigationButtons={[{ name: 'Some route' }, { name: 'Another route' }]} />
        <ContentWrapper navbar="true">
          <h2>Main</h2>
        </ContentWrapper>
      </>
    )
  }
}
