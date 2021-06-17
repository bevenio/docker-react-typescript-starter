import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const LoginPage = React.lazy(() => import('@/components/pages/login'))

export default RouterUtility.createRoute({
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
