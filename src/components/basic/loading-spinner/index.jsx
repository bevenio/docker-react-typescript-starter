import React from 'react'

/* Styles */
import './loading-spinner.scss'

export function LoadingSpinner() {
  return (
    <div className="app-loading-spinner-container">
      <div className="app-loading-spinner">
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default LoadingSpinner
