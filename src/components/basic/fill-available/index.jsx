import React from 'react'

/* Styles */
import './fill-available.scss'

export default function FillAvailable(props) {
  const { children } = props

  return (
    <span className="app-fill-available-outer">
      <span className="app-fill-available-inner">{children}</span>
    </span>
  )
}
