/* Styles */
import './loading-spinner.scss'

const LoadingSpinner = function () {
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

export { LoadingSpinner }
