import React from 'react'

import FillAvailable from '@/components/basic/fill-available/fill-available'
import LoadingSpinner from '@/components/basic/loading-spinner/loading-spinner'

import './loading.scss'

export const Loading = () => (
  <FillAvailable>
    <LoadingSpinner />
  </FillAvailable>
)

export default Loading
