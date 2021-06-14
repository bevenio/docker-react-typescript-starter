import './error.scss'

import React from 'react'

import FillAvailable from '@/components/basic/fill-available'

export const Error = ({ code = 'Oops..', text = 'Something bad happened' }) => (
  <FillAvailable>
    <div className="app-error-code">
      <h1>{code}</h1>
    </div>
    <p>{text}</p>
  </FillAvailable>
)

export default Error
