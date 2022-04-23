import { lazily } from 'react-lazily'
import { createRoutes } from '@/router/utility/router-utility.module'

// order of routes is important, since router will render first match
const routes = createRoutes([
  {
    route: '/login',
    redirection: '/',
    dependencies: { 'auth.jwt': (jwt) => jwt === null },
    component: lazily(() => import('@/components/pages/login')).LoginPage,
  },
  {
    route: '/settings',
    redirection: '/login',
    dependencies: { 'auth.jwt': (jwt) => jwt !== null },
    component: lazily(() => import('@/components/pages/settings')).SettingsPage,
  },
  {
    route: '/',
    redirection: '/login',
    dependencies: { 'auth.jwt': (jwt) => jwt !== null },
    component: lazily(() => import('@/components/pages/main')).MainPage,
  },
])

export { routes }
