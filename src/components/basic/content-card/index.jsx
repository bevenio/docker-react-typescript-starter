/* Styles */
import './content-card.scss'

const ContentCard = function (props) {
  const { children, label } = props
  return (
    <div className="app-content-card">
      {label ? <div className="app-content-card-label">{label}</div> : null}
      {children}
    </div>
  )
}

export { ContentCard }
