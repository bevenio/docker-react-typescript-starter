import React from 'react'
import RouterUtils from '@/router/utility/router.utility'

const LandingPage = React.lazy(() =>
  import('@/components/pages/landing/landing')
)

export default RouterUtils.createRoute({
  route: '/',
  exact: false,
  subroutes: [
    {
      key: 'landing',
      path: '/',
      pathFallback: '/login',
      exact: false,
      component: LandingPage,
      dependsOn: {
        'auth.jwt': (jwt) => jwt !== null,
      },
    },
  ],
})
