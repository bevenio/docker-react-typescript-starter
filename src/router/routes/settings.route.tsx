import { lazily } from 'react-lazily'
import { createRoute } from '@/router/utility/router-utility.module'

const { SettingsPage } = lazily(() => import('@/components/pages/settings'))

const SettingsRoute = createRoute({
  component: SettingsPage,
  route: '/settings',
  redirection: '/login',
  dependencies: { 'auth.jwt': (jwt) => jwt !== null },
})

export { SettingsRoute }
