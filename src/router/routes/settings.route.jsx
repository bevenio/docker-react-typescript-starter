import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const SettingsPage = React.lazy(() => import('@/components/pages/settings'))

export default RouterUtility.createRoute({
  component: SettingsPage,
  route: '/settings',
  redirection: '/login',
  dependencies: { 'auth.jwt': (jwt) => jwt !== null },
})
