import React from 'react'
import RouterUtils from '@/router/utility/router.utility'

const SettingsPage = React.lazy(() =>
  import('@/components/pages/settings/settings')
)

export default RouterUtils.createRoute({
  route: '/settings',
  subroutes: [
    {
      key: 'settings',
      path: '/settings',
      component: SettingsPage,
      exact: false,
      dependsOn: {
        'auth.jwt': (jwt) => !!jwt,
      },
    },
  ],
})
