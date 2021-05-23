import React from 'react'

import FillAvailable from '@/components/basic/fill-available/fill-available'
import NavigationBar from '@/components/composed/navigation-bar/navigation-bar'

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
        <FillAvailable>Landing</FillAvailable>
      </>
    )
  }
}
