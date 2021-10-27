import React from 'react'

/* Styles */
import './settings.scss'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import ContentWrapper from '@/components/basic/content-wrapper'
import NavigationBar from '@/components/composed/navigation-bar'

export default class Settings extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <PageLayout>
        <NavigationBar />
        <ContentWrapper navbar="true">
          <h1>Settings Page</h1>
          <p>{new Array(1000).fill('Lorem Ipsum, dipsum settings. ', 0, 1000).join(' ')}</p>
        </ContentWrapper>
      </PageLayout>
    )
  }
}
