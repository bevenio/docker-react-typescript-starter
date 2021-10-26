import React from 'react'

/* Styles */
import './landing.scss'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import NavigationBar from '@/components/composed/navigation-bar'
import ContentWrapper from '@/components/basic/content-wrapper'
import LoadingSpinner from '@/components/basic/loading-spinner'

export default class Landing extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <PageLayout>
        <NavigationBar
          navigationButtons={[
            { name: 'Game', route: '/game' },
            { name: 'Settings', route: '/settings' },
          ]}
        />
        <ContentWrapper navbar="true">
          <h2>Main</h2>
          <LoadingSpinner />
        </ContentWrapper>
      </PageLayout>
    )
  }
}
