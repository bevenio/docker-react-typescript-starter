import React from 'react'
import RouterUtility from '@/router/utility/router-utility.module'

const MainPage = React.lazy(() => import('@/components/pages/main'))

export default RouterUtility.createRoute({
  component: MainPage,
  route: '/',
  redirection: '/login',
  dependencies: { 'auth.jwt': (jwt) => jwt !== null },
})
