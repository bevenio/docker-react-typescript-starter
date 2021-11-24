import React from 'react'

/* Styles */
import './main.scss'

/* Services */
import StylesheetService from '@/services/stylesheet-service'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import ContentWrapper from '@/components/basic/content-wrapper'
import ContentCard from '@/components/basic/content-card'
import NoiseBackground from '@/components/basic/noise-background'

export default class Main extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  renderHack = ({ title, level, route }) => (
    <ContentCard label={`Level ${level}`}>
      <h4>{title}</h4>
      <button type="button">{`Start ${route}`}</button>
    </ContentCard>
  )

  render() {
    return (
      <NoiseBackground color={StylesheetService.getVariable('--color-accent-translucent')}>
        <PageLayout>
          <ContentWrapper navbar="true">
            <h2>Hacks</h2>
            {[
              { title: 'AI', level: 3, route: '/ai' },
              { title: 'Communicator', level: 3, route: '/com' },
              { title: 'Navigator', level: 2, route: '/nav' },
            ].map(this.renderHack)}
          </ContentWrapper>
        </PageLayout>
      </NoiseBackground>
    )
  }
}
