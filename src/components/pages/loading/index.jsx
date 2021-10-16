import React from 'react'

import PageLayout from '@/components/basic/page-layout'
import FillAvailable from '@/components/basic/fill-available'
import LoadingSpinner from '@/components/basic/loading-spinner'

import './loading.scss'

export const Loading = () => (
  <PageLayout>
    <FillAvailable>
      <LoadingSpinner />
    </FillAvailable>
  </PageLayout>
)

export default Loading
