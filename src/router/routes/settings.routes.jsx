import React from 'react'
import RouterUtils from '@/router/utility/router.utility'

const LoginPage = React.lazy(() => import('@/components/pages/login/login'))

const SettingsPage = React.lazy(() => import('@/components/pages/settings/settings'))

export default RouterUtils.createRoute({
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
