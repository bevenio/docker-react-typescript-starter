import React from 'react'

import FillAvailable from '@/components/basic/fill-available/fill-available'
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
        <FillAvailable>Settings</FillAvailable>
      </>
    )
  }
}
