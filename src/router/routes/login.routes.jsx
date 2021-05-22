import React from 'react'
import RouterUtils from '@/router/utility/router.utility'

const LoginPage = React.lazy(() => import('@/components/pages/login/login'))

export default RouterUtils.createRoute({
  route: '/login',
  subroutes: [
    {
      key: 'login',
      path: '/login',
      component: LoginPage,
      exact: false,
      dependsOn: {
        'appearance.theme': 'light',
      },
    },
  ],
})
