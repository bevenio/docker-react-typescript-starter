import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const LoginPage = React.lazy(() => import('@/components/pages/login'))
const SettingsPage = React.lazy(() => import('@/components/pages/settings'))

export default RouterUtility.createRoute({
  route: '/settings',
  exact: true,
  subroutes: [
    {
      key: 'settings',
      path: '/settings',
      exact: true,
      component: SettingsPage,
      fallback: LoginPage,
      dependsOn: {
        'auth.jwt': (jwt) => jwt !== null,
      },
    },
  ],
})
