import React from 'react'

/* Styles */
import './main.scss'

/* Services */
import StylesheetService from '@/services/stylesheet-service'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import NavigationBar from '@/components/composed/navigation-bar'
import ContentWrapper from '@/components/basic/content-wrapper'
import LoadingSpinner from '@/components/basic/loading-spinner'
import ContentCard from '@/components/basic/content-card'
import NoiseBackground from '@/components/basic/noise-background'

export default class Main extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <PageLayout>
        <NoiseBackground color={StylesheetService.getVariable('--color-accent-translucent')}>
          <NavigationBar
            navigationButtons={[
              { name: 'Game', route: '/game' },
              { name: 'Settings', route: '/settings' },
            ]}
          />
          <ContentWrapper navbar="true">
            <h2>Main</h2>
            <ContentCard>
              <LoadingSpinner />
            </ContentCard>
            <ContentCard>
              <LoadingSpinner />
            </ContentCard>
          </ContentWrapper>
        </NoiseBackground>
      </PageLayout>
    )
  }
}
