/* Styles */
import './content-card.scss'

interface Props {
  label?: string
  children: React.ReactNode
}

const ContentCard: React.FC<Props> = function (props) {
  const { children, label } = props
  return (
    <div className="app-content-card">
      {label ? <div className="app-content-card-label">{label}</div> : null}
      {children}
    </div>
  )
}

export { ContentCard }
