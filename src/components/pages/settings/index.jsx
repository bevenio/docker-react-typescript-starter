import React from 'react'

/* Styles */
import './settings.scss'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import ContentWrapper from '@/components/basic/content-wrapper'

export default class Settings extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <PageLayout>
        <ContentWrapper navbar="true">
          <h1>Settings</h1>
          <p>{new Array(1000).fill('Lorem Ipsum, dipsum settings. ', 0, 1000).join(' ')}</p>
        </ContentWrapper>
      </PageLayout>
    )
  }
}
