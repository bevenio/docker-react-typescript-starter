import { lazily } from 'react-lazily'
import { createRoute } from '@/router/utility/router-utility.module'

const { MainPage } = lazily(() => import('@/components/pages/main'))

const MainRoute = createRoute({
  component: MainPage,
  route: '/',
  redirection: '/login',
  dependencies: { 'auth.jwt': (jwt) => jwt !== null },
})

export { MainRoute }
