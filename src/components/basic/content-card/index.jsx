import React from 'react'

/* Styles */
import './content-card.scss'

export default function ContentCard(props) {
  const { children, label } = props
  return (
    <div className="app-content-card">
      {label ? <div className="app-content-card-label">{label}</div> : null}
      {children}
    </div>
  )
}
