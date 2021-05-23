import React from 'react'
import RouterUtils from '@/router/utility/router.utility'

const LoginPage = React.lazy(() => import('@/components/pages/login/login'))

export default RouterUtils.createRoute({
  route: '/login',
  exact: true,
  subroutes: [
    {
      key: 'login',
      path: '/login',
      exact: true,
      component: LoginPage,
      dependsOn: {
        'auth.jwt': (jwt) => jwt === null,
      },
    },
  ],
})
