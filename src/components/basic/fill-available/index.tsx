/* Styles */
import './fill-available.scss'

interface Props {
  children: React.ReactNode
}

const FillAvailable: React.FC<Props> = function (props) {
  const { children } = props

  return (
    <span className="app-fill-available-outer">
      <span className="app-fill-available-inner">{children}</span>
    </span>
  )
}

export { FillAvailable }
