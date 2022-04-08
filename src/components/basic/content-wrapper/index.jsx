import React from 'react'

/* Styles */
import './content-wrapper.scss'

export default function ContentWrapper(props) {
  const { children, navbar = false } = props

  return (
    <span className={`app-content-wrapper ${navbar ? 'app-content-wrapper-with-navbar' : ''}`}>
      <div className="app-content-wrapper-inner">{children}</div>
    </span>
  )
}
