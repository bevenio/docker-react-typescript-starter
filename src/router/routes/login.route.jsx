import { lazily } from 'react-lazily'
import { createRoute } from '@/router/utility/router-utility.module'

const { LoginPage } = lazily(() => import('@/components/pages/login'))

const LoginRoute = createRoute({
  component: LoginPage,
  route: '/login',
  redirection: '/',
  dependencies: { 'auth.jwt': (jwt) => jwt === null },
})

export { LoginRoute }
