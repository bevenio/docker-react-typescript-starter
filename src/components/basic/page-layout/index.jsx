/* Styles */
import './page-layout.scss'

const PageLayout = function (props) {
  const { children } = props
  return <span className="app-page-layout">{children}</span>
}

export { PageLayout }
