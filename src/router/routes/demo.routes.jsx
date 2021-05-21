import React from 'react'
import RouterUtils from '@/router/utility/router.utility'

const DemoFeatureOne = React.lazy(() =>
  import('@/components/pages/demo-one/demo-one')
)
const DemoFeatureTwo = React.lazy(() =>
  import('@/components/pages/demo-two/demo-two')
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
