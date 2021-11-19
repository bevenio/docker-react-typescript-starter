import React from 'react'

/* Styles */
import './route-layout.scss'

export default (props) => {
  const { children } = props
  return <span className="app-route-layout">{children}</span>
}
