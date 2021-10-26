import React from 'react'

import PageLayout from '@/components/basic/page-layout'
import NavigationBar from '@/components/composed/navigation-bar'
import ContentWrapper from '@/components/basic/content-wrapper'

import TranslationService from '@/services/translation-service'

import './landing.scss'

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
          <p>
            foo: {TranslationService.translate('foo')}
            <br />
            level.one: {TranslationService.translate('level.one')}
          </p>
        </ContentWrapper>
      </PageLayout>
    )
  }
}
