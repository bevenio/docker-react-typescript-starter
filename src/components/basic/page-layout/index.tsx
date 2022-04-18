/* Styles */
import './page-layout.scss'

interface Props {
  children: React.ReactNode
}

const PageLayout: React.FC<Props> = function (props) {
  const { children } = props
  return <span className="app-page-layout">{children}</span>
}

export { PageLayout }
