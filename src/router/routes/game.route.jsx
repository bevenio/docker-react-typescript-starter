import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const GamePage = React.lazy(() => import('@/components/pages/game'))

export default RouterUtility.createRoute({
  component: GamePage,
  route: '/game',
  redirection: '/login',
  dependencies: { 'auth.jwt': (jwt) => jwt !== null },
})
