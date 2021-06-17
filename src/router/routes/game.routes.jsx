import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const LoginPage = React.lazy(() => import('@/components/pages/login'))
const GamePage = React.lazy(() => import('@/components/pages/game'))

export default RouterUtility.createRoute({
  route: '/game',
  exact: false,
  subroutes: [
    {
      key: 'game',
      path: '/game/',
      exact: true,
      component: GamePage,
      fallback: LoginPage,
      dependsOn: {
        'auth.jwt': (jwt) => jwt !== null,
      },
    },
    {
      key: 'game-id',
      path: '/game/:id',
      exact: true,
      component: GamePage,
      fallback: LoginPage,
      dependsOn: {
        'auth.jwt': (jwt) => jwt !== null,
      },
    },
  ],
})
