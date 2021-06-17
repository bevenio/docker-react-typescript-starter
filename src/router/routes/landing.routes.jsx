import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const LoginPage = React.lazy(() => import('@/components/pages/login'))
const LandingPage = React.lazy(() => import('@/components/pages/landing'))

export default RouterUtility.createRoute({
  route: '/',
  exact: false,
  subroutes: [
    {
      key: 'landing',
      path: '/',
      exact: false,
      component: LandingPage,
      fallback: LoginPage,
      dependsOn: {
        'auth.jwt': (jwt) => jwt !== null,
      },
    },
  ],
})
