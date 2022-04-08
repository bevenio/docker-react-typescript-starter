import React from 'react'

/* Styles */
import './page-layout.scss'

export default function PageLayout(props) {
  const { children } = props
  return <span className="app-page-layout">{children}</span>
}
