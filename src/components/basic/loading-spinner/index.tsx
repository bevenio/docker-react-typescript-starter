/* Styles */
import './loading-spinner.scss'

const LoadingSpinner: React.FC = function () {
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
