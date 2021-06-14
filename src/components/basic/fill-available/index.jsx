import React from 'react'

import './fill-available.scss'

export default (props) => {
  const { children } = props

  return (
    <span className="app-fill-available-outer">
      <span className="app-fill-available-inner">{children}</span>
    </span>
  )
}
