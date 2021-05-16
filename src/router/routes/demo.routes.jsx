import React from 'react'
import RouterUtils from '@/router/router.utility'

const DemoFeatureOne = React.lazy(() =>
  import('@/feature-library/demo-one/demo-one')
)
const DemoFeatureTwo = React.lazy(() =>
  import('@/feature-library/demo-two/demo-two')
)

export default RouterUtils.createRoute({
  route: '/demo',
  subroutes: [
    {
      key: 'demo-one',
      path: '/demo',
      component: DemoFeatureOne,
      exact: true,
      dependsOn: {
        'appearance.theme': 'light',
      },
    },
    {
      key: 'demo-two',
      path: '/demo/2',
      component: DemoFeatureTwo,
      exact: true,
      dependsOn: {
        'appearance.theme': 'dark',
      },
    },
  ],
})
