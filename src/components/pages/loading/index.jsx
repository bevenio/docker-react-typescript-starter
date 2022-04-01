import React from 'react'

/* Styles */
import './loading.scss'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import FillAvailable from '@/components/basic/fill-available'
import LoadingSpinner from '@/components/basic/loading-spinner'

export const Loading = () => (
  <PageLayout>
    <FillAvailable>
      <LoadingSpinner />
    </FillAvailable>
  </PageLayout>
)

export default Loading
