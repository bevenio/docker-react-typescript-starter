import React from 'react'

/* Styles */
import './content-card.scss'

export default (props) => {
  const { children } = props

  return <div className="app-content-card">{children}</div>
}
