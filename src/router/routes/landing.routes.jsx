import React from 'react'
import RouterUtils from '@/router/utility/router.utility'

const LoginPage = React.lazy(() => import('@/components/pages/login'))
const LandingPage = React.lazy(() => import('@/components/pages/landing'))

export default RouterUtils.createRoute({
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
