import './error.scss'

import React from 'react'

import PageLayout from '@/components/basic/page-layout'
import FillAvailable from '@/components/basic/fill-available'

export const Error = ({ code = 'Oops..', text = 'Something bad happened' }) => (
  <PageLayout>
    <FillAvailable>
      <div className="app-error-code">
        <h1>{code}</h1>
      </div>
      <p>{text}</p>
    </FillAvailable>
  </PageLayout>
)

export default Error
