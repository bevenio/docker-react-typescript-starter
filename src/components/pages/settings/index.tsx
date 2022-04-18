/* Styles */
import './settings.scss'

/* Components */
import { PageLayout } from '@/components/basic/page-layout'
import { ContentWrapper } from '@/components/basic/content-wrapper'
import { SettingsForm } from '@/components/composed/settings-form'

const SettingsPage = function () {
  return (
    <PageLayout>
      <ContentWrapper navbar>
        <h1>Settings</h1>
        <SettingsForm />
      </ContentWrapper>
    </PageLayout>
  )
}

export { SettingsPage }
