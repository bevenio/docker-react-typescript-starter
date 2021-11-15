import React from 'react'

/* Styles */
import './main.scss'

/* Services */
import StylesheetService from '@/services/stylesheet-service'

/* Components */
import PageLayout from '@/components/basic/page-layout'
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
      <NoiseBackground color={StylesheetService.getVariable('--color-accent-translucent')}>
        <PageLayout>
          <ContentWrapper navbar="true">
            <h2>Hacks</h2>
            <ContentCard>
              <LoadingSpinner />
            </ContentCard>
            <ContentCard>
              <LoadingSpinner />
            </ContentCard>
          </ContentWrapper>
        </PageLayout>
      </NoiseBackground>
    )
  }
}
