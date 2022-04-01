import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const LoginPage = React.lazy(() => import('@/components/pages/login'))

export default RouterUtility.createRoute({
  component: LoginPage,
  route: '/login',
  redirection: '/',
  dependencies: { 'auth.jwt': (jwt) => jwt === null },
})
