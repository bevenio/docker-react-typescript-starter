import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const LandingPage = React.lazy(() => import('@/components/pages/landing'))

export default RouterUtility.createRoute({
  component: LandingPage,
  route: '/',
  redirection: '/login',
  dependencies: { 'auth.jwt': (jwt) => jwt !== null },
})
